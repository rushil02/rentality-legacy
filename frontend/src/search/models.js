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

export class ESHouse{
    constructor(){
        this._id = '';
        this._source = {
            adress: '',
            create_time: '',
            geo_point: {
                lat: null,
                lon: null
            },
            home_type: '',
            leased: '',
            location: '',
            min_stay: '',
            rent: '',
            thumbnail: '',
            title: '',
            user_image: '',
            uuid: ''
        }
    }
}