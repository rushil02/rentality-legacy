import {omit} from "lodash";

export default class APIModelAdapter {
    /**
     * Construct JS objects for easy manipulation for API and user interactions.
     *
     * bulkUpdate() vs constructor()
     * Both facilitate setting data for the object from DB's data (using key value pairs as from BE),
     * but following is the difference in their functioning -
     *      - bulkUpdate uses setData() method and therefore all fields are marked as changed.
     *
     * @param dbObj
     * @param status - settings: [empty, saved, hasChanged], default: saved
     *
     * fieldMap() - returns an object with each field as key and value as another object as it's settings
     *              Example - {comment: {key: 'house_rule', parser: this.parseComment}},
     *              Setting options - key : field from server/DB [can use dot nested access]
     *                                parser: [optional] to manipulate obtained value from DB. This setting
     *                                        will not work if 'adapter' setting is also provided
     *                                adapter: [optional] to create a nested APIModelAdapter
     *                                default: [optional] used if value is not provided by DB else it is assigned ''
     *                                readOnly: [optional] if attribute is not to be changed in DB,
     *                                          will raise warning whenever value is changed,
     *                                          readOnly attributes are not serialized
     *                                writeOnly: [optional] if attribute is not to be received from DB, but is to be
     *                                          serialized. Any received value fromm DB will be discarded.
     *                                serializer: [optional] to manipulate date while serializing object
     *                                required: [optional] TODO - Raise ValidationError when serializing for db and when user is entering data - to raise error, just update this.errors from component
     *                                validator: [optional] TODO - Validates user input to match the given regex - will require debounced check on keypress
     *                                many: [optional, default - False] TODO - Field is set as list using 'APIModelListAdapter', constructor and serializer implementation required
     */

    constructor(dbObj, status) {
        this._attrs = {};
        this.errors = {};
        this._fieldMap = this.fieldMap();
        this.status = status || 'saved';

        for (let [field, settings] of Object.entries(this._fieldMap)) {
            this._constructAttribute(field, settings, dbObj)
        }
        this.changedFields = []
    }

    _silentUpdate(key, value) {
        /**
         * Doesn't update the status of model or the fields that have changed.
         * Any data modified using this method will not be available in partial serializer/ PATCH.
         *
         * This is useful when some fields have updated via other processes and need to be reflected without
         * explicit sync of current model.
         */

        this._attrs[key] = value;
        return this
    }

    _constructAttribute = (field, settings, source) => {
        let defaultVal, value;

        if (settings.writeOnly) {
            value = undefined;
        } else {
            const keyList = settings.key.split('.');
            value = source;
            for (let i = 0; i < keyList.length; i++) {
                if (value.hasOwnProperty(keyList[i])) {
                    value = value[keyList[i]]
                } else {
                    if (this.status !== 'empty') {
                        // Checks and warns if a dbOBj doesn't contain specified fields
                        // dbObj and empty objects are differentiated using status 'saved' and 'empty' respectively.
                        console.warn(`${keyList[i]} Not Found in Response. May cause unexpected behaviour.`)
                    }
                    value = undefined;
                    break;
                }
            }
        }

        if (settings.adapter) {
            defaultVal = settings.hasOwnProperty('default') ? settings.default : {};
            this._attrs[field] = new settings.adapter(value || defaultVal, this.status);
        } else {
            // Explicit check for undefined and null only, as `false` can also be a value
            // Checking for undefined allows to create empty objects, while a primitive check is done above
            // for absent fields.
            if (value !== undefined && value !== null) {
                if (settings.parser) {
                    this._attrs[field] = settings.parser(value)
                } else {
                    this._attrs[field] = value
                }
            } else {
                // Default is blank string; maintains boolean logic and input display logic
                this._attrs[field] = settings.hasOwnProperty('default') ? settings.default : "";
            }
        }

    };

    fieldMap() {
        /**
         * To be overridden by all child implementations
         */
    };

    getData = (key, parentList) => {
        /**
         * 'parentList' is an array used for nested 'APIModelAdapter' model objects. Array is in
         * order of hierarchy of nesting. If 'parentList' is provided 'key' represents the attribute
         * in the innermost nested object.
         *
         * @param key - attribute key [can use dot nested access]
         * @param parentList - [optional] array of parents in hierarchy
         */
        let modelObj = this;
        const keyList = key.split('.');

        if (keyList.length > 1) {
            for (let i = 0; i < keyList.length; i++) {
                if (modelObj._fieldMap.hasOwnProperty(keyList[i])) {
                    modelObj = modelObj.getData(keyList[i]);
                } else {
                    throw `${keyList[i]} is not a valid key in  ${this.constructor.name} | ${keyList}`
                }
            }
        } else {
            // TODO: Remove parentList access URGENT!
            if (parentList && Array.isArray(parentList)) {
                for (let i = 0; i < parentList.length; i++) {
                    if (modelObj._fieldMap.hasOwnProperty(parentList[i])) {
                        modelObj = modelObj.getData(parentList[i]);
                    } else {
                        throw `${parentList[i]} is not a valid key in ${this.constructor.name} | ${parentList}`
                    }
                }
            }
        }
        if (modelObj._fieldMap.hasOwnProperty(key)) {
            return modelObj._attrs[key]
        } else {
            throw `${key} is not a valid key in ${this.constructor.name}`
        }
    };


    // Used for backend error serialization
    // Clears all other errors if any
    parseError(errorMap) {
        /**
         * Constructs a mapping for all errors received from backend API
         * Example - this.errors = {field: [error1, error2, ...], ...}
         * Calling this function will remove all previous errors.
         *
         * @param errorMap: object mapped using backend keys
         */
        this.errors = {};

        for (let [field, settings] of Object.entries(this._fieldMap)) {

            const keyList = settings.key.split('.');
            let errorVal = errorMap;
            for (let i = 0; i < keyList.length; i++) {
                if (errorVal.hasOwnProperty(keyList[i])) {
                    errorVal = errorVal[keyList[i]]
                }
            }
            this.errors[field] = errorVal;
            if (settings.adapter) {
                this.errors[field] = this.getData(field).parseError(errorVal).errors
            } else {
                this.errors[field] = errorVal
            }
        }

        return this
    };

    updateError = (errorMap) => {
        /**
         * Updates the error mapping with the provided keys and
         * removes an error if the corresponding key is empty.
         *
         * @param errorMap: object mapped using frontend field keys
         */
        let errors = Object.entries(errorMap);
        for (let i = 0; i < errors.length; i++) {
            if (errors[i][1] != null && errors[i][1] !== '') {
                if (this._fieldMap[errors[i][0]].adapter) {
                    this.errors[errors[i][0]] = this.getData(errors[i][0]).updateError(errorMap[i][1]).errors
                } else {
                    this.errors[errors[i][0]] = errors[i][1]
                }
            } else {
                if (errors[i][0] in this.errors) {
                    delete this.errors[errors[i][0]];
                }
            }
        }
    };


    setData = (key, value, parentList) => {
        /**
         * Use to change data by user actions.
         * 'parentList' is an array used for nested 'APIModelAdapter' model objects. Array is in
         * order of hierarchy of nesting. If 'parentList' is provided 'key' represents the attribute
         * in the innermost nested object.
         *
         * #TODO: Add functionality to validate content and raise errors
         * @param key - attribute key [can use dot nested access]
         * @param value - new value
         * @param parentList - [optional] array of parents in hierarchy
         */

        console.debug(`Changing value for ${key} to ${value} [${parentList}]`);

        let modelObj = this;
        const keyList = key.split('.');

        if (keyList.length > 1) {
            for (let i = 0; i < keyList.length; i++) {
                if (modelObj._fieldMap.hasOwnProperty(keyList[i])) {
                    modelObj = modelObj.getData(keyList[i]);
                } else {
                    throw `${keyList[i]} is not a valid key in  ${this.constructor.name} | ${keyList}`
                }
            }
        } else {
            // TODO: Remove parentList access URGENT!
            if (parentList && Array.isArray(parentList)) {
                for (let i = 0; i < parentList.length; i++) {
                    if (modelObj._fieldMap.hasOwnProperty(parentList[i])) {
                        modelObj.status = "hasChanged";
                        modelObj.changedFields.push(key);
                        modelObj = modelObj.getData(parentList[i]);
                    } else {
                        throw `${parentList[i]} is not a valid key in ${this.constructor.name} ${parentList}`
                    }
                }
            }
        }

        if (modelObj._fieldMap.hasOwnProperty(key)) {
            if (modelObj._fieldMap[key].readOnly) {
                console.warn('You are trying to change readOnly data. The data will not be serialized.');
            }
            modelObj.status = "hasChanged";
            modelObj.changedFields.push(key);
            modelObj._attrs[key] = value;
            return this
        } else {
            throw `${key} is not a valid key in ${this.constructor.name}`
        }
    };

    _serializeData(field, settings) {
        if (settings.readOnly) {
            return undefined // This will unset the key from JSON object
        }
        if (this.getData(field) === '') {
            return null
        }
        if (settings.adapter) {
            return this.getData(field).serialize('__all__')
        } else {
            if (settings.serializer) {
                return settings.serializer(this.getData(field));
            } else {
                return this.getData(field);
            }
        }
    }

    _serializeCompositeKeys(compositeKey, value, initial) {
        let ret = initial;
        const keyList = compositeKey.split('.');
        ret = keyList.reduce((_ret, curr, index, keyList) => {
            if (_ret.hasOwnProperty(curr)) {
                return _ret
            } else {
                _ret[curr] = index < (keyList.length - 1) ? {} : value;
            }
            return _ret
        }, ret);
        return ret
    }

    // Use while sending Data to server
    serialize(fields) {
        let ret = {};
        if (!fields || fields === '__all__') {
            for (let [field, settings] of Object.entries(this._fieldMap)) {
                ret = this._serializeCompositeKeys(
                    settings.key,
                    this._serializeData(field, settings),
                    ret
                );
            }
        } else if (fields === '__partial__') {
            fields = this.changedFields;
            for (let i = 0; i < fields.length; i++) {
                ret = this._serializeCompositeKeys(
                    this._fieldMap[fields[i]].key,
                    this._serializeData(fields[i], this._fieldMap[fields[i]]),
                    ret
                );
            }
        } else {
            if (!Array.isArray(fields)) {
                console.error("Provided fields is not a list");
            }
            for (let i = 0; i < fields.length; i++) {
                ret = this._serializeCompositeKeys(
                    this._fieldMap[fields[i]].key,
                    this._serializeData(fields[i], this._fieldMap[fields[i]]),
                    ret
                );
            }
        }
        return ret
    }

    getErrorsForField = (field, parentList) => {
        /**
         * Fetch list of all errors as an array for a field.
         */

        let errorMap = this.errors;

        if (parentList && Array.isArray(parentList)) {
            for (let i = 0; i < parentList.length; i++) {
                if (errorMap.hasOwnProperty(parentList[i])) {
                    errorMap = errorMap[parentList[i]]
                }
            }
        }

        if (errorMap.hasOwnProperty(field) && Array.isArray(errorMap[field]) && errorMap[field].length !== 0) {
            return errorMap[field]
        } else {
            return null
        }
    };

    bulkUpdate(data, source = 'int', parentList) {
        /**
         * NOTE: Silently suppresses if any extra attribute is provided by the database (source='DB') which
         * is not in fieldMap.
         *
         * data -> object of field and value pairs, source can be raw db or internal from FE
         * source -> 'DB' or 'int' (database or internal)
         * Returns self to work similar to 'setData'
         */

        let modelObj = this;

        if (parentList && Array.isArray(parentList)) {
            for (let i = 0; i < parentList.length; i++) {
                if (modelObj._fieldMap.hasOwnProperty(parentList[i])) {
                    modelObj.status = "hasChanged";
                    modelObj.changedFields.push(parentList[i]);
                    modelObj = modelObj.getData(parentList[i]);
                } else {
                    throw `${parentList[i]} is not a valid key in ${this.constructor.name} ${parentList}`
                }
            }
        }

        if (source === 'int') {
            for (let [field, value] of Object.entries(data)) {
                modelObj._fieldMap.hasOwnProperty(field) ? modelObj.setData(field, value) :
                    throw `${field} not found while bulk updating in ${this.constructor.name}`;
            }
        }

        if (source === 'DB') {
            for (let [field, settings] of Object.entries(this._fieldMap)) {
                const keyList = settings.key.split('.');
                let value = data;
                for (let i = 0; i < keyList.length; i++) {
                    if (value.hasOwnProperty(keyList[i])) {
                        value = value[keyList[i]]
                    } else {
                        break;
                    }
                }
                settings.adapter ? modelObj.getData(field).bulkUpdate(value, source) : modelObj.setData(field, value)
            }
        }

        return this
    }
}


export class APIModelListAdapter {
    /**
     * List of APIModels
     * @param objModel - APIModelAdapter class
     * @param status - settings: [empty, saved, hasChanged], default: saved
     * @param dbData - array of dbObj
     * @param uniqueKey - [optional] unique field present in dbData, NOT as defined in the objModel
     * @param removeParents - [optional] list of keys which removes outermost parent keys from each object in DB list
     */

    constructor(dbData, objModel, uniqueKey, status, removeParents) {
        this._data = {};
        this._model = objModel;
        this._key = uniqueKey;

        this.status = status || 'saved';

        this._constructObjModel(dbData, removeParents);

    }

    getList() {
        // returns list of objects
        return Object.values(this._data)
    }

    getObjectList() {
        // returns list of objects
        return Object.entries(this._data)
    }

    getObjects() {
        return this._data
    }

    getObject(key) {
        return this._data[key]
    }

    updateObject(objID, field, value) {
        this._data[objID].setData(field, value);
        this.status = 'hasChanged';
        return this
    }


    _constructObjModel = (data, removeParents) => {
        let indexOffset = Object.entries(this._data).length;
        data.map((dbObj, index) => {
            let key = this._key ? dbObj[this._key] : (index + indexOffset);
            if (removeParents) {
                removeParents.forEach(parent => {
                    dbObj = dbObj[parent];
                });
            }
            this._data[key] = new this._model(dbObj);
        });
    };

    appendPagination(dbData, removeParents) {
        // Accepts list of objects from DB
        this._constructObjModel(dbData, removeParents);
        return this
    }

    update(modelObj, key) {
        /**
         * Create or Update an object in reference to a key
         *
         * @param modelObj:
         * @param key: [optional] for overriding key set in constructor
         */
        if (!key && !this._key) {
            console.error("No key provided for update to work.")
        }

        // Warn for no data, and return
        if (!modelObj) {
            console.warn("No Object provided");
            return this
        }

        this._data[key || modelObj.getData(this._key)] = modelObj;
        return this
    }

    remove(key) {
        this._data = omit(this._data, key);
        return this
    }

    updateMultiple(modelObjs) {
        if (!this._key) {
            console.error("Multi update cannot work without list level key")
        }
        modelObjs.map((item) => {
            this.update(item)
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
        return this
    }

    updateStatus = (newStatus) => {
        this.status = newStatus;
        return this
    }
}


export function mergeModelStates(stateList) {
    /**
     * Useful when a page has single controller attached to multiple routes (APIs)
     */

    if (stateList.length === 0) {
        throw Error("`stateList` is empty")
    }

    // Checks are in order of display priority
    if (stateList.indexOf('hasChanged') >= 0) {
        return 'hasChanged'
    } else if (stateList.indexOf('empty') >= 0) {
        return 'empty'
    } else {
        return 'saved'
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


export class PostalLocation extends APIModelAdapter {

    fieldMap() {
        return {
            id: {key: 'id',},
            type: {key: 'type',},
            coords: {key: 'geometry', parser: this.parseGeometry},
            properties: {key: 'properties', parser: this.parseProperties},
        }
    };

    parseGeometry(data) {
        if (data) {
            return data.coordinates
        }
        return []
    };

    parseProperties(data) {
        if (data) {
            return {
                code: data['code'],
                name: data['name'],
                region: data['region_name'],
                country: data['country']['name']
            }
        }
        return {name: '', region: '', country: ''}
    }
}
