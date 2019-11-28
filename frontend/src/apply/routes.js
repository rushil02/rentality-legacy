export default {
    interface: {
        base: '',
        houseInfo: 'property/info/:houseUUID',
    },
    APIs: {
        houseDetails: '/property/detail/:houseUUID', // URL starts from root
        homeOwnerDetails: '/ho/gen-info/:houseUUID', // URL starts from root
        availableDates: '/property/current-availability/:houseUUID', // URL starts from root
        unavailableDates: '/property/current-unavailability/:houseUUID', // URL starts from root
        applyBooking: '/book/:houseUUID'
    }
}
