export class PostalCodeSearchModel {
    constructor(){
        this._id = '';
        this._index = '';
        this._score = '';
        this._source = {
            geo_point:{
                lat: null,
                lon: null
            },
            parent_verbose: '',
            verbose: ''
        };
    }
}