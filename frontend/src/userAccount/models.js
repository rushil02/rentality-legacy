import APIModelAdapter from "core/utils/ModelHelper";

export class UserPII extends APIModelAdapter {
    fieldMap() {
        return {
            email: {key: "email", readOnly: true},
            sex: {key: "sex"},
            billingCountryID: {key: "billing_country"},
            firstName: {key: "first_name"},
            lastName: {key: "last_name"},
            DOB: {key: "dob", parser: this.parseDate, serializer: this.serializeDate},
            billingPostcodeID: {key: "billing_postcode"},
            accountType: {key: "account_type", readOnly: true},
            contactNum: {key: "contact_num"},
            billingStreetAddress: {key: "billing_street_address"},
            businessName: {key: "business_name"},
        };
    }

    parseDate(dateStr) {
        return new Date(dateStr);
    }

    serializeDate(dateObj) {
        const yyyy = dateObj.getFullYear().toString();
        const mm = (dateObj.getMonth() + 1).toString(); // getMonth() is zero-based
        const dd = dateObj.getDate().toString();
        return  yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
    }
}

export class PersonalityTag extends APIModelAdapter {
    fieldMap() {
        return {
            objID: {key: "id", default: null},
            verbose: {key: "verbose"},
            checked: {key: "checked"},
        };
    }
}

export class BillingCountry extends APIModelAdapter {
    fieldMap() {
        return {
            billingCountry: {key: "billing_country"},
            readOnly: {key: "read_only", readOnly: true},
        };
    }
}
