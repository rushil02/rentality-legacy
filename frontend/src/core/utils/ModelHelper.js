export default class APIModelAdapter {
    /**
     *
     * @param dbObj
     * @param status - settings: [empty, saved, hasChanged], default: saved
     *
     * fieldMap() - returns an object with each field as key and value as another object as it's settings
     *              Example - {comment: {key: 'house_rule', parser: this.parseComment}},
     *              Setting options - key : field from server/DB
     *                                parser: [optional] to manipulate obtained value from DB
     *                                adapter: [optional] to created a nested APIModelAdapter
     *                                default: if value is not provided bt DB
     *              Note: `parser` and `adapter` do not work together. `adapter` has precedence over `parser` setting.
     */
    constructor(dbObj, status) {
        this._attrs = {};
        this.errors = {};
        this._fieldMap = Object.entries(this.fieldMap());
        this.reverseFieldMap = {};
        this.status = status || 'saved';
        for (let i = 0; i < this._fieldMap.length; i++) {
            this._constructAttribute(this._fieldMap[i][0], this._fieldMap[i][1], dbObj)
        }
        this.changedFields = []
    }

    _parseAttr(data, settings) {
        if (settings.parser) {
            return settings.parser(data)
        } else {
            return data
        }
    }

    _constructAttribute = (field, settings, source) => {
        let defaultVal;
        // Checks and warns if a dbOBj doesn't contain specified fields
        // dbObj and empty objects are differentiated using status 'saved' and 'empty' respectively.
        if (source[settings.key] === undefined && this.status !== 'empty') {
            console.warn(`${settings.key} Not Found in Response. May cause unexpected behaviour.`)
        }
        if (settings.adapter) {
            defaultVal = settings.hasOwnProperty('default') ? settings.default : {};
            this._attrs[field] = new settings.adapter(source[settings.key] || defaultVal);
        } else {
            // Explicit check for undefined and null only, as `false` can also be a value
            // Checking for undefined allows to create empty objects, while a primitive check is done above
            // for absent fields.
            if (source[settings.key] !== undefined && source[settings.key] !== null) {
                if (settings.parser) {
                    this._attrs[field] = settings.parser(source[settings.key])
                } else {
                    this._attrs[field] = source[settings.key]
                }
            } else {
                // Default is blank string; maintains boolean logic and input display logic
                this._attrs[field] = settings.hasOwnProperty('default') ? settings.default : "";
            }
        }
        this.reverseFieldMap[settings.key] = field;
    };

    fieldMap() {
    };

    // FIXME : Nesting paradigm is ambiguous and untested
    getData = (keyList) => {
        // Accepts a list of keys in order of hierarchy from parent to child
        if (keyList.isArray) {
            let currAttr = this._attrs;
            for (let i = 0; i < keyList.length; i++) {
                currAttr = currAttr[i]
            }
            return currAttr
        } else {
            return this._attrs[keyList]
        }
    };


    // Used for backend error serialization
    // Clears all other errors if any
    parseError(errorMap) {
        this.errors = {};
        let errors = Object.entries(errorMap);
        for (let i = 0; i < errors.length; i++) {
            if (errors[i][1] && errors[i][1] !== '') {
                this.errors[this.reverseFieldMap[errors[i][0]]] = errors[i][1]
            }
        }
    };

    updateError = (errorMap) => {
        let errors = Object.entries(errorMap);
        for (let i = 0; i < errors.length; i++) {
            if (errors[i][1] != null && errors[i][1] !== '') {
                this.errors[errors[i][0]] = errors[i][1]
            } else {
                if (errors[i][0] in this.errors) {
                    delete this.errors[errors[i][0]];
                }
            }
        }
    };


    setData = (key_list, value) => {
        // Accepts a list of keys in order of hierarchy from parent to child
        // FIXME : Nesting not tested
        if (key_list.isArray) {
            let currAttr = this._attrs;
            for (let i = 0; i < key_list.length - 1; i++) {
                currAttr = currAttr[i]
            }
            currAttr[key_list.length - 1] = value;
        } else {
            this._attrs[key_list] = value;
        }
        this.changedFields.push(key_list);
        this.status = "hasChanged";
        return this
    };

    // Use while sending Data to server
    serialize(fields) {
        let ret = {};
        if (!fields || fields === '__all__') {
            for (let i = 0; i < this._fieldMap.length; i++) {
                if (this._fieldMap[i][1].adapter) {
                    ret[this._fieldMap[i][1].key] = this.getData(this._fieldMap[i][0]).serialize('__all__')
                } else {
                    ret[this._fieldMap[i][1].key] = this.getData(this._fieldMap[i][0]) === '' ? null : this.getData(this._fieldMap[i][0]);
                }
            }
        } else if (fields === '__partial__') {
            fields = this.changedFields;
            for (let i = 0; i < fields.length; i++) {
                if (this.fieldMap()[fields[i]].adapter) {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i]).serialize('__all__')
                } else {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i])  === '' ? null : this.getData(fields[i])
                }
            }
        } else {
            for (let i = 0; i < fields.length; i++) {
                if (this.fieldMap()[fields[i]].adapter) {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i]).serialize('__all__')
                } else {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i])  === '' ? null : this.getData(fields[i])
                }
            }
        }
        return ret
    }
}


export class APIModelListAdapter {
    /**
     * List of APIModels
     * @param objModel - APIModelAdapter class
     * @param status - settings: [empty, saved, hasChanged], default: saved
     * @param dbData - array of dbObj
     * @param uniqueKey - [optional] unique field
     */

    constructor(dbData, objModel, uniqueKey, status) {
        this._data = {};
        this._model = objModel;
        this._key = uniqueKey;

        this.status = status || 'saved';

        this._constructObjModel(dbData);

    }

    getList() {
        return this._data
    }

    updateObject(objID, field, value) {
        this._data[objID].setData(field, value);
        this.status = 'hasChanged';
        return this
    }


    _constructObjModel = (data) => {
        let indexOffset = Object.entries(this._data).length;
        data.map((dbObj, index) => {
            let key = this._key ? dbObj[this._key] : (index + indexOffset);
            this._data[key] = new this._model(dbObj);
        });
    };

    appendPagination(dbData) {
        // Accepts list of objects from DB
        this._constructObjModel(dbData);
        return this
    }

    update(modelObj, key) {
        /**
         * @param modelObj:
         * @param key: [optional]
         */
        if(!key && !this._key){
            console.error("No key provided for append to work.")
        }

        this._data[key || modelObj.getData(this._key)] = modelObj;
        return this
    }

    updateMultiple(modelObjs) {
        if(!this._key){
            console.error("Concat cannot work without list level key")
        }
        modelObjs.map((item) => {
            this.append(item)
        });
    }

    serialize(listPartialUpdate, objPartialUpdate) {
        let respData = [];
        if (listPartialUpdate) {
            Object.values(this._data).map((item) => {
                if (item.status === "hasChanged") {
                    respData.push(item.serialize(objPartialUpdate))
                }
            });
        } else {
            Object.values(this._data).map((item) => {
                respData.push(item.serialize(objPartialUpdate))
            });
        }
        return respData
    }

    parseErrors(errorList, listPartialUpdate) {
        let counter = 0;
        if (listPartialUpdate) {
            Object.values(this._data).map((item) => {
                if (item.status === "hasChanged") {
                    item.parseError(errorList[counter]);
                    counter++;
                }
            });
        } else {
            Object.values(this._data).map((item) => {
                item.parseError(errorList[counter]);
                counter++;
            });
        }
        return data
    }
}


export class DateRangeModel extends APIModelAdapter {

    fieldMap() {
        return {
            startDate: {key: 'lower',},
            endDate: {key: 'upper',}
        }
    };

}