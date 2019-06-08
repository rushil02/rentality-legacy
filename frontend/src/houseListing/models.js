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
            rent: {key: 'rent'},
            minStay: {key: 'min_stay', default: 28},
            maxStay: {key: 'max_stay', default: 0},
            maxPeopleAllowed: {key: 'max_people_allowed', default: 2},

            // Form Rules
            otherRules: {key: 'other_rules'},

            // Info for Guests
            description: {key: 'description'},
            accessRestrictions: {key: 'access_restrictions'},
            otherPeopleDescription: {key: 'other_people_description'},

            // Others
            UUID: {key: 'uuid'},
            cancellationPolicyID: {key: 'cancellation_policy', default: null}
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
            objID: {key: 'id', default: null},
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
        } else {
            this._forms[formID].saveCallback = callback
        }
    };


    // For safety - Destroy current Form reference on form Unmount
    unloadForm = () => {
        this.currForm = undefined;
    };

    getCurrentFormState = () => {
        if (Array.isArray(this._forms[this.currForm].state)) {
            return this.mergeFormStates(this._forms[this.currForm].state)
        } else {
            return this._forms[this.currForm].state
        }
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

    updateFormState = (formID, formState, subCompIndex) => {
        /**
         * subCompIndex - [Optional] Sub-Component Index - Used for composite Form States
         */

        // Extra Check for direct conversion from dataState to formState
        if (formState === 'empty') {
            formState = 'initial';
        }
        if (subCompIndex !== undefined && subCompIndex !== false && subCompIndex !== null) {
            this._forms[formID].state[subCompIndex] = formState;
        } else {
            this._forms[formID].state = formState;
        }
    };

    mergeFormStates = (stateList) => {
        /**
         * Since structure of FormState is not controlled, composite formState can be used in the form
         * of a list, where index of list represents any controlled components within the form.
         * Useful when a page has single form controller attached to multiple routes (APIs)
         */

        // Checks are in order of display priority
        if (stateList.indexOf('error') >= 0) {
            return 'error'
        } else if (stateList.indexOf('hasChanged') >= 0) {
            return 'hasChanged'
        } else if (stateList.indexOf('saved') >= 0) {
            return 'saved'
        } else {
            return 'initial'
        }
    };

    getFormDetails = (formID) => {
        return this._forms[formID]
    }

}


export class Rule extends APIModelAdapter {
    fieldMap() {
        return {
            ruleID: {key: 'id',},
            verbose: {key: 'verbose',},
            options: {key: 'options',},
            selected: {key: 'house_rule', parser: this.parseSelected},
            comment: {key: 'house_rule', parser: this.parseComment},
        }
    }

    parseSelected(data) {
        if (data[0]) {
            return data[0].value
        }
        return ""
    };

    parseComment(data) {
        if (data[0]) {
            return data[0].comment
        }
        return ""
    };

    parseError(errorMap) {
        this.errors = {};
        if (errorMap.value && errorMap.value !== '') {
            this.errors.selected = errorMap.value
        }
        if (errorMap.comment && errorMap.comment !== '') {
            this.errors.comment = errorMap.comment
        }
        if (errorMap.rule_id && errorMap.rule_id !== '') {
            this.errors.ruleID = errorMap.rule_id
        }
    }

    serialize(fields) {
        return ({
            "rule_id": this.getData('ruleID'),
            "value": this.getData('selected'),
            "comment": this.getData('comment')
        })
    }
}


export class Image extends APIModelAdapter {
    fieldMap() {
        return {
            imagePath: {key: 'image',},
            isThumbnail: {key: 'is_thumbnail', default: false},
            uuid: {key: 'uuid',},
        }
    }
}


export class CancellationPolicy extends APIModelAdapter {
    fieldMap() {
        return {
            objID: {key: 'id',},
            verbose: {key: 'verbose',},
            description: {key: 'description',},
            officialPolicy: {key: 'official_policy', default: null}
        }
    }
}