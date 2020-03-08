import APIModelAdapter from "core/utils/ModelHelper";
import {format} from "date-fns";

export class House extends APIModelAdapter {
    // Declare all Defaults here

    fieldMap() {
        return {
            homeType: {key: 'home_type',},
            facilities: {key: 'facilities', default: []},
            rules: {key: 'rules', default: []},
            neighbourhoodFacilities: {key: 'neighbourhood_facilities', default: []},
            welcomeTags: {key: 'welcome_tags', default: []},
            homeOwner: {key: 'home_owner'},
            UUID: {key: 'uuid'},
            title: {key: 'title'},
            furnished: {key: 'furnished'},
            numBedrooms: {key: 'bedrooms'},
            numBathrooms: {key: 'bathrooms'},
            numParkSpaces: {key: 'parking'},
            rent: {key: 'rent'},
            minStay: {key: 'min_stay'},
            maxStay: {key: 'max_stay'},
            maxPeopleAllowed: {key: 'max_people_allowed'},
            otherRules: {key: 'other_rules'},
            description: {key: 'description'},
            accessRestrictions: {key: 'access_restrictions'},
            otherPeopleDescription: {key: 'other_people_description'},
            neighbourhoodDescription: {key: 'neighbourhood_description'},
        }
    };
}

export class Image extends APIModelAdapter {
    fieldMap() {
        return {
            image: {key: 'image'},
            isThumbnail: {key: 'is_thumbnail'},
            UUID: {key: 'uuid'}
        }
    }
}


export class CancellationPolicy extends APIModelAdapter {
    fieldMap() {
        return {
            verbose: {key: 'verbose'},
            description: {key: 'description'},
            official_policy: {key: 'official_policy', default: null}
        }
    }
}


export class HomeOwnerInfo extends APIModelAdapter {
    fieldMap() {
        return {
            profilePicture: {key: 'profile_pic'},
            businessName: {key: 'business_name'},
            personalityTags: {key: 'personality_tags', default: []},
            firstName: {key: 'user', parser: this.parseFirstName},
            lastName: {key: 'user', parser: this.parseLastName},
        }
    }

    parseFirstName(data) {
        if (data) {
            return data['first_name']
        }
        return ""
    }

    parseLastName(data) {
        if (data) {
            return data['last_name']
        }
        return ""
    }
}


export class Application extends APIModelAdapter {
    fieldMap() {
        return {
            applicant: {key: 'tenant_details', adapter: Applicant},
            bookingInfo: {key: 'booking_info', adapter: BookingInfo},
            message: {key: 'tenant_message'},
            houseRulesAgreement:{key: 'agree_to_house_rules', default: false},
            houseAmountAgreement:{key: 'agree_to_pay', default: false},
            rentalityRulesAgreement:{key: 'agree_to_tnc', default: false},
        }
    }
}

export class Applicant extends APIModelAdapter {
    fieldMap() {
        return {
            firstName: {key: 'first_name'},
            lastName: {key: 'last_name'},
            email: {key: 'email'},
            contactNum: {key: 'contact_num'},
            sex: {key: 'sex'},
        }
    }
}

export class BookingInfo extends APIModelAdapter {
    fieldMap() {
        return {
            bookingStartDate: {key: 'start_date', default: new Date(), serializer: this.dateSerializer},
            bookingEndDate: {key: 'end_date', default: new Date(), serializer: this.dateSerializer},
            numGuests: {key: 'guests', default: 1},
            promoCodes: {key: 'promo_codes', default:[]},
        }
    }

    dateSerializer(date){
        return format(date, "YYYY-MM-DD")
    }
}