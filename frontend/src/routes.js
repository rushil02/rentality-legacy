import {include} from 'named-urls'


export default {
    static_route: '/static/',

    // Used as links only [Currently]
    // Probably this will move and group appropriately to [new] source
    home: '/',
    blogs: '/blogs/',
    howItWorks: '/pages/how-it-works/',
    listHome: '/property/add/',
    dashboard: '/',
    contactUs: '/pages/contact-us/',

    // Source [Entry-points] URLs
    // These URLs redirect to new html pages and are expected to be handled accordingly.
    // FIXME: Prepend needs to be removed after complete frontend migrations to react
    react: include('/rep', {
        houseListing: include('house/list', {
            base: '',
            create: 'create',
            edit: 'edit/:houseUUID',
        }),
    }),

    // APIs
    application: include('/apply', {
        bookingDetails: 'amount/:houseUUID',
        create: 'create-app/:houseUUID',
        tenant: 'tenant-details',
        complete: 'comp'
    }),
    promo: include('/promo', {
        verifyApplicationDiscount: 'verify-promo-use/application/tenant',
        verifyHouseDiscount: 'verify-promo-use/house/home_owner'
    }),

    house: include('/property', {
        formOptions: 'form-options',
        detail: 'create/edit/:houseUUID',
        edit: 'create/edit/:houseUUID',
        create: 'create/api',
        availability: include('availability', {
            list: 'list/:houseUUID',
            create: ':houseUUID',
            update: ':houseUUID/:objID',
            remove: ':houseUUID/:objID',
        }),
    }),
    user: include('/', {
        info: 'cu-info',
        userProfile: 'user-profile/'
    }),
    cities: include('/cities', {
        postalCodeVerbose: 'postal-code-vo'
    })
};


