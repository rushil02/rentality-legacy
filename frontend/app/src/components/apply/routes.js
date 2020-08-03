export default {
    interface: {
        base: "",
        houseInfo: "info/:houseUUID",
        success: "app/success/:applicationUUID",
    },
    APIs: {
        houseDetails: "/property/detail/:houseUUID", // URL starts from root
        homeOwnerDetails: "/ho/gen-info/:houseUUID", // URL starts from root
        availableDates: "/property/current-availability/:houseUUID", // URL starts from root
        unavailableDates: "/property/current-unavailability/:houseUUID", // URL starts from root
        applyBooking: "initiate/:houseUUID",
        confirmBooking: "exec-intent/:houseUUID/:applicationUUID",
        bookingDetails: "application-info-list/:applicationUUID",
        amountDetails: "amount/:houseUUID",
    },
}
