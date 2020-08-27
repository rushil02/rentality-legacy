export default {
    interface: {
        base: "",
        houseInfo: "info/:houseUUID/",
        success: "/booking/info/:applicationUUID/",
    },
    APIs: {
        houseDetails: "/api/property/detail/:houseUUID", // URL starts from root
        homeOwnerDetails: "/api/ho/gen-info/:houseUUID", // URL starts from root
        availableDates: "/api/property/current-availability/:houseUUID", // URL starts from root
        unavailableDates: "/api/property/current-unavailability/:houseUUID", // URL starts from root
        applyBooking: "initiate/:houseUUID",
        confirmBooking: "exec-intent/:houseUUID/:applicationUUID",
        bookingDetails: "application-info-list/:applicationUUID",
        amountDetails: "amount/:houseUUID",
    },
}
