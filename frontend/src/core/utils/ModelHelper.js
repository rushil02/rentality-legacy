export default class APIModelAdapter {
    constructor(dbObj) {
        // this.fieldMap = fieldMap;
        this._attrs = {};
        this._fieldMap = Object.entries(this.fieldMap());
        for (let i = 0; i < this._fieldMap.length; i++) {
            this._constructAttribute(this._fieldMap[i][0], this._fieldMap[i][1], dbObj)
        }
    }

    _constructAttribute = (key, options, source) => {
        if (options.adapter) {
            let defaultVal = options.default || {};
            this._attrs[key] = new options.adapter(source[options.key] || defaultVal);
        } else {
            let defaultVal = options.default || "";
            this._attrs[key] = source[options.key] || defaultVal;
        }
    };

    fieldMap() {
    };

    getData = (key_list) => {
        // Accepts a list of keys in order of hierarchy from parent to child
        if (key_list.isArray) {
            let currAttr = this._attrs;
            for (let i = 0; i < key_list.length; i++) {
                currAttr = currAttr[i]
            }
            return currAttr
        } else {
            return this._attrs[key_list]
        }
    };

    setData = (key_list, value) => {
        // Accepts a list of keys in order of hierarchy from parent to child
        if (key_list.isArray) {
            let currAttr = this._attrs;
            for (let i = 0; i < key_list.length - 1; i++) {
                currAttr = currAttr[i]
            }
            currAttr[key_list.length - 1] = value;
        } else {
             this._attrs[key_list] = value;
        }
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
    fieldMap = {
        startDate: {key: 'lower',},
        endDate: {key: 'upper',}
    }
}