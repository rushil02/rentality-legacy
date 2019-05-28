export default class APIModelAdapter {
    /**
     *
     * @param dbObj
     * @param status - options: [empty, saved, hasChanged], default: saved
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

    _constructAttribute = (key, options, source) => {
        let defaultVal;
        if (options.adapter) {
            defaultVal = options.hasOwnProperty('default') ? options.default : {};
            this._attrs[key] = new options.adapter(source[options.key] || defaultVal);
        } else {
            if (source[options.key] !== undefined) { // Explicit check for undefined only, as `false` can also be a value
                this._attrs[key] = source[options.key]
            } else {
                defaultVal = options.hasOwnProperty('default') ? options.default : "";
                this._attrs[key] = source[options.key] || defaultVal;
            }
        }
        this.reverseFieldMap[options.key] = key;
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
    parseUpdateError = (errorMap) => {
        this.errors = {};
        let errors = Object.entries(errorMap);
        for (let i = 0; i < errors.length; i++) {
            if (errors[i][1] != null && errors[i][1] !== '') {
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
                    ret[this._fieldMap[i][1].key] = this.getData(this._fieldMap[i][0])
                }
            }
        } else if (!fields || fields === '__partial__') {
            fields = this.changedFields;
            for (let i = 0; i < fields.length; i++) {
                if (this.fieldMap()[fields[i]].adapter) {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i]).serialize('__all__')
                } else {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i])
                }
            }
        } else {
            for (let i = 0; i < fields.length; i++) {
                if (this.fieldMap()[fields[i]].adapter) {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i]).serialize('__all__')
                } else {
                    ret[this.fieldMap()[fields[i]].key] = this.getData(fields[i])
                }
            }
        }
        return ret
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