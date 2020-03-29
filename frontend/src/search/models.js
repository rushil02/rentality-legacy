import APIModelAdapter, {DateRangeModel} from "core/utils/ModelHelper";

export class PostalCodeSearchModel extends APIModelAdapter {
    //Declare all defaults here

    fieldMap() {
        return {
            id: {key: "_id"},
            parent_verbose: {key: "_source.parent_verbose"},
            // geo_point_lat: {key:'geo_point_lat',},
            // geo_point_lon: {key:'geo_point_lon',},
            verbose: {key: "_source.verbose"}
        };
    }
}

export class ESHouse extends APIModelAdapter {
    //Declare all defaults here

    fieldMap() {
        return {
            address: {key: "address"},
            // create_time: {key: 'create_time'},
            // geo_point_lat: {key:'geo_point_lat',},
            // geo_point_lon: {key:'geo_point_lon',},
            homeType: {key: "home_type"},
            leased: {key: "leased"},
            location: {key: "location"},
            minStay: {key: "min_stay"},
            rent: {key: "rent"},
            thumbnail: {key: "thumbnail"},
            title: {key: "title"},
            userImage: {key: "user_image"},
            uuid: {key: "uuid"}
        };
    }
}

export class SearchFormModel extends APIModelAdapter {
    fieldMap() {
        return {
            location: {key: "location"},
            locationSuggestion: {key: "loc_sugg"},
            homeType: {key: "home_type"},
            startDate: {
                key: "start_date",
                default: this.getDate(4),
                parser: this.dateParser
            },
            endDate: {
                key: "end_date",
                default: this.getDate(34),
                parser: this.dateParser
            },
            rent: {key: "rent"},
            paginationStart: {key: "pagination-start", default: 0},
            paginationEnd: {key: "pagination-end", default: 12}
        };
    }

    getDate(daysToAdd) {
        let date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date;
    }

    dateParser(dateString) {
        if (!dateString) return new Date();
        let a = dateString.split("-");
        let b = a[2] + "-" + a[1] + "-" + a[0];
        return new Date(b);
    }

    nextPagination = (offset) => {
        this.setData('paginationStart', this.getData('paginationStart') + offset);
        this.setData('paginationEnd', this.getData('paginationEnd') + offset);
    }
}
