import {include} from 'named-urls'

export default {
    home: '/',
    blogs: '/blogs/',
    howItWorks: '/pages/how-it-works/',
    listHome: '/property/add/',
    dashboard: '/',

    // APIs
    application: include('/apply', {
        bookingDetails: 'get-house-detail/:houseUUID'
    }),
    promo:include('/promo', {
        verify: 'verify-promo-use'
    }),

};


