import APIModelAdapter, {DateRangeModel} from 'core/utils/ModelHelper';


export class House extends APIModelAdapter {
    // Declare all Defaults here

    fieldMap() {
        return {
            // Form Primary
            title: {key: 'title',},
            houseNum: {key: 'address_hidden',},
            streetName: {key: 'address',},
            postalCodeID: {key: 'location',},
            homeType: {key: 'home_type',},
            furnished: {key: 'furnished', default: "Y"},
            numBedrooms: {key: 'bedrooms', default: 1},
            numBathrooms: {key: 'bathrooms', default: 1},
            numParkSpaces: {key: 'parking', default: 0},

            // Form Rent & availability
            rent: {key: 'rent', default: 0},
            minStay: {key: 'min_stay', default: 28},
            maxStay: {key: 'max_stay', default: 0},
            maxPeopleAllowed: {key: 'max_people_allowed', default: 2},

            // Others
            UUID: {key: 'uuid'}
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

export class Facility extends APIModelAdapter {
    fieldMap() {
        return {
            objID: {key: 'id',},
            verbose: {key: 'verbose',},
            checked: {key: 'checked',},
        }
    }
}


export class FormOptions {
    constructor(dbObj) {
        this.requiredFields = dbObj.required_fields || [];
        let fieldOptions = dbObj.field_options || {};
        this.furnishedOptions = fieldOptions.furnished || {};
        this.homeTypeOptions = fieldOptions.home_type || {};
    }
}


export class Navigator {
    /**
     * _forms => {formID: {state: formState, saveCallback: fn, verbose: FormName}}
     * formState => {saved, hasChanged, initial, error}
     */
    constructor(nextToEditMode) {
        // loaded for each form
        this.currForm = undefined;

        // Constant for whole lifeCycle
        this.nextToEditMode = nextToEditMode;

        // Stores all loaded forms in a lifeCycle, ie. Only the forms which are loaded by user while interfacing.
        this._forms = {};
    }

    // Does not overwrite old states of form
    loadForm = (formID, callback, formState, formName) => {
        this.currForm = formID;
        if (!this._forms.hasOwnProperty(formID)) {
            this._forms[formID] = {state: formState, saveCallback: callback, verbose: formName};
        }
    };


    // For safety - Destroy current Form reference on form Unmount
    unloadForm = () => {
        this.currForm = undefined;
    };

    getCurrentFormState = () => {
        return this._forms[this.currForm].state
    };

    getCurrentSaveCallback = () => {
        return this._forms[this.currForm].saveCallback
    };

    getCurrentVerbose = () => {
        return this._forms[this.currForm].verbose
    };

    updateCurrentFormState = (newState) => {
        this._forms[this.currForm].state = newState
    };

    updateFormState = (formID, formState) => {
        // Extra Check for direct conversion from dataState to formState
        if (formState === 'empty') {
            formState = 'initial';
        }
        this._forms[formID]['state'] = formState;
    };

    getFormDetails = (formID) => {
        return this._forms[formID]
    }

}