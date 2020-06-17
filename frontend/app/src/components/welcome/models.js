import APIModelAdapter from "core/utils/ModelHelper";
import {format} from "date-fns";

export class House extends APIModelAdapter {
    //Declare all defaults here

    fieldMap() {
        return {
            uuid: {key: "uuid"},
            title: {key: "title"},
            location: {key: "location"},
            homeType: {key: "home_type"},
            rent: {key: "rent"},
            minStay: {key: "min_stay", parser: this.getWeeks},
            thumbnail: {key: "thumbnail"},
            status: {key: "status"},
        };
    }

    getWeeks(days) {
        const weeks = Math.ceil(days / 7);
        return weeks > 1 ? weeks + " weeks" : weeks + " week";
    }
}

export class SearchForm extends APIModelAdapter {
    fieldMap() {
        return {
            location: {key: "location"},
            locationSuggestion: {key: "loc_sugg"},
            startDate: {
                key: "start_date",
                default: this.getDate(4),
                parser: this.dateParser,
                serializer: this.dateSerializer,
            },
            endDate: {
                key: "end_date",
                default: this.getDate(34),
                parser: this.dateParser,
                serializer: this.dateSerializer,
            },
        };
    }

    getDate(daysToAdd) {
        let date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date;
    }

    dateParser(dateString) {
        if (!dateString) return new Date();
        return new Date(dateString);
    }

    dateSerializer(date) {
        return format(date, "yyyy-MM-dd");
    }
}
