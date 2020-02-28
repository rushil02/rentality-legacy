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
     *              Setting options - key : field from server/DB
     *                                parser: [optional] to manipulate obtained value from DB. This setting
     *                                        will not work if 'adapter' setting is also provided
     *                                adapter: [optional] to create a nested APIModelAdapter
     *                                default: [optional] used if value is not provided by DB else it is assigned ''
     *                                readOnly: [optional] if attribute is not to be changed in DB,
     *                                          will raise warning whenever value is changed,
     *                                          readOnly attributes are not serialized
     *                                serializer: [optional] to manipulate date while serializing object
     *                                required: [optional] TODO - Raise ValidationError when serializing for db and when user is entering data - to raise error, just update this.errors from component
     *                                validator: [optional] TODO - Validates user input to match the given regex - will require debounced check on keypress
     *                                many: [optional, default - False] TODO - Field is set as list using 'APIModelListAdapter', constructor and serializer implementation required
     */

    constructor(dbObj, status) {
        this._attrs = {};
        this.errors = {};
        this._fieldMap = this.fieldMap();
        this.reverseFieldMap = {}; // Maps backend keys to frontend model keys
        this.status = status || 'saved';

        const fieldMapList = Object.entries(this._fieldMap);
        for (let i = 0; i < fieldMapList.length; i++) {
            this._constructAttribute(fieldMapList[i][0], fieldMapList[i][1], dbObj)
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

    // TODO: Move following validation to test phase instead of runtime
    validateFieldMap = (field, settings) => {
        if (!settings.key) {
            console.error(`${field} : key is missing. API object/data reference key.`)
        }
        if (settings.parser && settings.adapter) {
            console.error(`${field} : parser and adapter cannot be used together. Adapter has precedence.`)
        }

        if (settings.validator && settings.adapter) {
            console.error(`${field} : validator and adapter cannot be used together.`)
        }

        if (settings.serializer && settings.adapter) {
            console.error(`${field} : serializer and adapter cannot be used together. Adapter has precedence.`)
        }

        if (settings.serializer && settings.readOnly) {
            console.error(`${field} : serializer and readOnly cannot be used together. Data will not be serialized.`)
        }

        if (settings.parser && !settings.serializer && !settings.readOnly) {
            console.warn(`${field} : serializer is missing where parser is present. May cause problems while serializing. Is the data readOnly?`)
        }

        if (settings.many && !settings.adapter) {
            console.error(`${field} : 'many' setting is set without adapter.`)
        }

    };

    _constructAttribute = (field, settings, source) => {
        // TODO: Move following validation to test phase instead of runtime
        // this.validateFieldMap(field, settings);

        let defaultVal;
        // Checks and warns if a dbOBj doesn't contain specified fields
        // dbObj and empty objects are differentiated using status 'saved' and 'empty' respectively.
        if (source[settings.key] === undefined && this.status !== 'empty') {
            console.warn(`${settings.key} Not Found in Response. May cause unexpected behaviour.`)
        }
        if (settings.adapter) {
            defaultVal = settings.hasOwnProperty('default') ? settings.default : {};
            this._attrs[field] = new settings.adapter(source[settings.key] || defaultVal, this.status);
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
         * @param key - attribute key
         * @param parentList - [optional] array of parents in hierarchy
         */

        let modelObj = this;
        if (parentList && Array.isArray(parentList)) {
            for (let i = 0; i < parentList.length; i++) {
                if (modelObj._fieldMap.hasOwnProperty(parentList[i])) {
                    modelObj = modelObj.getData(parentList[i]);
                } else {
                    throw `${parentList[i]} is not a valid key in ${this.constructor.name} ${parentList}`
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
        let _errors = Object.entries(errorMap);
        for (let i = 0; i < _errors.length; i++) {
            if (_errors[i][1] && _errors[i][1] !== '') {
                let field = this.reverseFieldMap[_errors[i][0]];
                if (field) {
                    if (this._fieldMap[field].adapter) {
                        this.errors[field] = this.getData(field).parseError(_errors[i][1]).errors
                    } else {
                        this.errors[field] = _errors[i][1]
                    }
                }
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
         * @param key - attribute key
         * @param value - new value
         * @param parentList - [optional] array of parents in hierarchy
         */

        console.debug(`Changing value for ${key} to ${value} [${parentList}]`);

        let modelObj = this;

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

    // Use while sending Data to server
    serialize(fields) {
        let ret = {};
        if (!fields || fields === '__all__') {
            let _fieldMap = Object.entries(this._fieldMap);
            for (let i = 0; i < _fieldMap.length; i++) {
                ret[_fieldMap[i][1].key] = this._serializeData(_fieldMap[i][0], _fieldMap[i][1]);
            }
        } else if (fields === '__partial__') {
            fields = this.changedFields;
            for (let i = 0; i < fields.length; i++) {
                ret[this._fieldMap[fields[i]].key] = this._serializeData(fields[i], this._fieldMap[fields[i]]);
            }
        } else {
            if (!Array.isArray(fields)) {
                console.error("Provided fields is not a list");
            }
            for (let i = 0; i < fields.length; i++) {
                ret[this._fieldMap[fields[i]].key] = this._serializeData(fields[i], this._fieldMap[fields[i]]);
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
         * NOTE: Silently suppresses if any extra attribute is provided which is not in fieldMap.
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

        for (let [field, value] of Object.entries(data)) {
            if (source === 'DB') {
                field = modelObj.reverseFieldMap[field];
                field ? modelObj.setData(field, value) : null;
            } else if (source === 'int') {
                modelObj._fieldMap.hasOwnProperty(field) ? modelObj.setData(field, value) : null;
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
     */

    constructor(dbData, objModel, uniqueKey, status) {
        this._data = {};
        this._model = objModel;
        this._key = uniqueKey;

        this.status = status || 'saved';

        this._constructObjModel(dbData);

    }

    // FIXME: Rename method - returns an object not list
    getList() { // Deprecated
        // returns object
        return this._data
    }

    getObjectList() {
        // returns list of objects
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
