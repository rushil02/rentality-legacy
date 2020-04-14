import APIModelAdapter, {DateRangeModel} from "core/utils/ModelHelper";

export class House extends APIModelAdapter {
    //Declare all defaults here

    fieldMap() {
        return {
            uuid: {key: "uuid"},
            title: {key: "title"},
            houseNum: {key: "address_hidden"},
            streetName: {key: "address"},
            location: {key: "location"},
            homeType: {key: "home_type"},
            rent: {key: "rent"},
            cancellationPolicy: {key: "cancellation_policy"},
            status: {key: "status"},
        };
    }
}

export class Booking extends APIModelAdapter {
    fieldMap() {
        return {
            homeOwner: {key: "home_owner", adapter: HomeOwner},
            title: {key: "house_meta.title"},
            houseNum: {key: "house_meta.address_hidden"},
            streetName: {key: "house_meta.address"},
            homeType: {key: "house_meta.home_type.name"},
            location: {key: "house_meta.location.name_full"},
            rent: {key: "rent"},
            bookingAmount: {key: "booking_amount"},
            cancellationPolicy: {key: "cancellation_policy.verbose", default: ""},
            numberOfGuests: {key: "meta.guests"},
            status: {key: "status"},
            bookingStartDate: {key: "date.lower", parser: this.parseDate},
            bookingEndDate: {key: "date.upper", parser: this.parseDate},
            refCode: {key: "ref_code"},
        };
    }
    parseDate(dateStr) {
        return new Date(dateStr);
    }
}

class HomeOwner extends APIModelAdapter {
    fieldMap() {
        return {
            firstName: {key: "user.first_name"},
            lastName: {key: "user.last_name"},
            email: {key: "user.email"},
            contactNum: {key: "contact_num"},
        };
    }
}
