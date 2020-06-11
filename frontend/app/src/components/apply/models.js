import APIModelAdapter from "core/utils/ModelHelper"
import { format } from "date-fns"
import { DateRangeModel } from "core/utils/ModelHelper"

export class House extends APIModelAdapter {
    // Declare all Defaults here

    fieldMap() {
        return {
            homeType: { key: "home_type" },
            facilities: { key: "facilities", default: [] },
            rules: { key: "rules", default: [] },
            neighbourhoodFacilities: {
                key: "neighbourhood_facilities",
                default: [],
            },
            welcomeTags: { key: "welcome_tags", default: [] },
            homeOwner: { key: "home_owner" },
            UUID: { key: "uuid" },
            title: { key: "title" },
            furnished: { key: "furnished" },
            numBedrooms: { key: "bedrooms" },
            numBathrooms: { key: "bathrooms" },
            numParkSpaces: { key: "parking" },
            rent: { key: "rent" },
            minStay: { key: "min_stay" },
            maxStay: { key: "max_stay" },
            maxPeopleAllowed: { key: "max_people_allowed" },
            otherRules: { key: "other_rules" },
            description: { key: "description" },
            accessRestrictions: { key: "access_restrictions" },
            otherPeopleDescription: { key: "other_people_description" },
            neighbourhoodDescription: { key: "neighbourhood_description" },
        }
    }
}

export class Image extends APIModelAdapter {
    fieldMap() {
        return {
            image: { key: "image" },
            isThumbnail: { key: "is_thumbnail" },
            UUID: { key: "uuid" },
        }
    }
}

export class CancellationPolicy extends APIModelAdapter {
    fieldMap() {
        return {
            verbose: { key: "verbose" },
            description: { key: "description" },
            official_policy: { key: "official_policy", default: null },
        }
    }
}

export class HomeOwnerInfo extends APIModelAdapter {
    fieldMap() {
        return {
            profilePicture: { key: "profile_pic" },
            businessName: { key: "business_name" },
            personalityTags: { key: "personality_tags", default: [] },
            firstName: { key: "user.first_name" },
            lastName: { key: "user.last_name" },
        }
    }
}

export class Application extends APIModelAdapter {
    fieldMap() {
        return {
            applicant: { key: "tenant_details", adapter: Applicant },
            bookingInfo: { key: "booking_info", adapter: BookingInfo },
            message: { key: "tenant_message" },
            houseRulesAgreement: {
                key: "agree_to_house_rules",
                default: false,
            },
            houseAmountAgreement: { key: "agree_to_pay", default: false },
            rentalityRulesAgreement: { key: "agree_to_tnc", default: false },
        }
    }
}

export class Booking extends APIModelAdapter {
    fieldMap() {
        return {
            applicant: { key: "tenant", adapter: Applicant },
            bookingDateRange: {
                key: "booking_dates",
                adapter: DateRangeModel,
            },
            // numGuests: { key: "guests", default: 1 },
            status: { key: "status" },
            bookingAmount: { key: "booking_amount" },
            rent: { key: "rent" },
            bookedHouse: { key: "house_meta", adapter: BookedHouse },
        }
    }

    dateSerializer(date) {
        return format(date, "YYYY-MM-DD")
    }
}

export class BookedHouse extends APIModelAdapter {
    fieldMap() {
        return {
            houseUUID: { key: "uuid" },
            title: { key: "title" },
            houseNum: { key: "address_hidden" },
            streetName: { key: "address" },
            homeType: { key: "home_type.name" },
            location: { key: "location.name" },
        }
    }
}

export class Applicant extends APIModelAdapter {
    fieldMap() {
        return {
            firstName: { key: "first_name" },
            lastName: { key: "last_name" },
            email: { key: "email" },
            contactNum: { key: "contact_num" },
            sex: { key: "sex" },
        }
    }
}

export class BookingInfo extends APIModelAdapter {
    fieldMap() {
        return {
            bookingStartDate: {
                key: "start_date",
                default: null,
                serializer: this.dateSerializer,
            },
            bookingEndDate: {
                key: "end_date",
                default: null,
                serializer: this.dateSerializer,
            },
            numGuests: { key: "guests", default: 1 },
            promoCodes: { key: "promo_codes", default: [] },
        }
    }

    dateSerializer(date) {
        return format(date, "YYYY-MM-DD")
    }
}

export class FinancialInfo extends APIModelAdapter {
    fieldMap() {
        return {
            weeklyRent: { key: "weekly_rent" },
            payableRent: { key: "payable_rent", parser: parseFloat },
            payableAmount: { key: "payable_amount", parser: parseFloat },
            serviceFee: { key: "service_fee.value", parser: parseFloat },
            stayDuration: { key: "stay_duration", parser: parseFloat },
        }
    }
}
