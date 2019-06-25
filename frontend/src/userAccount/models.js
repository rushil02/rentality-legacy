import APIModelAdapter from "core/utils/ModelHelper";

export class UserPII extends APIModelAdapter {
    fieldMap() {
        return {
            email: {key: 'email', readOnly: true},
            sex: {key: 'sex'},
            billingCountryID: {key: 'billing_country'},
            firstName: {key: 'first_name'},
            lastName: {key: 'last_name'},
            DOB: {key: 'dob'},
            billingPostcodeID: {key: 'billing_postcode'},
            accountType: {key: 'account_type', readOnly: true},
            contactNum: {key: 'contact_num'},
            billingStreetAddress: {key: 'billing_street_address'},
        }
    }
}

export class PersonalityTag extends APIModelAdapter {
    fieldMap() {
        return {
            objID: {key: 'id', default: null},
            verbose: {key: 'verbose',},
            checked: {key: 'checked',},
        }
    }
}

export class BillingCountry extends APIModelAdapter {
    fieldMap() {
        return {
            billingCountry: {key: 'billing_country',},
            readOnly: {key: 'read_only', readOnly: true},
        }
    }
}
