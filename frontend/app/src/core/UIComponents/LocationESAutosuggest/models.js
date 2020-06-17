import APIModelAdapter from "core/utils/ModelHelper";

export class LocationSearchModel extends APIModelAdapter {
    //Declare all defaults here

    fieldMap() {
        return {
            id: {key: "_id"},
            parent_verbose: {key: "_source.parent_verbose"},
            // geo_point_lat: {key:'geo_point_lat',},
            // geo_point_lon: {key:'geo_point_lon',},
            verbose: {key: "_source.verbose"},
        };
    }
}
