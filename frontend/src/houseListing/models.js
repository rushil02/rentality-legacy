import APIModelAdapter, {DateRangeModel} from 'core/utils/ModelHelper';


export class House extends APIModelAdapter {
    // Declare all Defaults here

    fieldMap() {
        return {
            // Form Primary
            title: {key: 'title',},
            houseNum: {key: 'address_hidden',},
            streetName: {key: 'address',},
            postalCode: {key: 'location',},
            homeType: {key: 'home_type',},
            furnished: {key: 'furnished', default: "Y"},
            numBedrooms: {key: 'bedrooms', default: 1},
            numBathrooms: {key: 'bathrooms', default: 1},
            numParkSpaces: {key: 'parking', default: 0},

            // Form Rent & availability
            rent: {key: 'rent'},
            minStay: {key: 'min_stay', default: 28},
            maxStay: {key: 'max_stay', default: 0},
            maxPeopleAllowed: {key: 'max_people_allowed', default: 2},
        }
    };

}

export class Availability extends APIModelAdapter {

    fieldMap() {
        return {
            objID: {key: 'id',},
            dateRange: {key: 'date_range', adapter: DateRangeModel}
        }
    }

}

export class FormOptions {
    constructor(dbObj){
        this.requiredFields = dbObj.required_fields || [];
        let fieldOptions = dbObj.field_options || {};
        this.furnishedOptions = fieldOptions.furnished || {};
        this.homeTypeOptions= fieldOptions.home_type || {};
    }
}

export class Navigator {
    constructor(saveCallback, currForm){
        this.saveCallback = saveCallback;
        this.currForm = currForm;
    }
}