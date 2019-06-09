import APIModelAdapter from "../core/utils/ModelHelper";

export class UserProfile extends APIModelAdapter {
    fieldMap() {
        return {
            "email": {key: 'email'},
            "sex": {key: 'sex'},
            "billingCountry": {key: 'billing_country', readOnly:true},
            "lastName": {key: 'last_name'},
            "DOB": {key: 'dob'},
            "billingPostcode": {key: 'billing_postcode'},
            "accountType":  {key: 'account_type'},
            "contactNum":  {key: 'contact_num'},
            "billingStreetAddress":  {key: 'billing_street_address'},
            "profilePic":  {key: 'billingPostcode'},
        }
    }
}