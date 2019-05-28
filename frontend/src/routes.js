import {include} from 'named-urls';
import houseListingRoutes from 'houseListing/routes';

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
    auth: include('/accounts', {
        login: 'login/',
        signup: 'signup/'
    }),

    // Source [Entry-points] URLs
    // These URLs redirect to new html pages and are expected to be handled accordingly.
    // FIXME: Prepend needs to be removed after complete frontend migrations to react
    react: include('/rep', {
        houseListing: include('house/list', {
            base: '',
            create: 'create',
            edit: 'edit/:houseUUID',
        }),
        samplePage: 'property/samplePage',
        userProfile: 'profile/',
    }),

    // APIs
    userNavInfo: '/user-nav-info',
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

    house: include('/property', houseListingRoutes),

    user: include('/', {
        info: 'cu-info',
        profile: 'user-profile',
        uploadProfilePic: 'upload-profile-pic'
    }),

    cities: include('/cities', {
        postalCodeSuggestions: 'postal-code-sugg',
        postalCodeDetails: 'postal-code-details/:objID'
    })
};


