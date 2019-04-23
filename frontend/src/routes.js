import {include} from 'named-urls'

// Warning: All routes should be registered in Django, even if they are used
// internally by frontend only.
// FIXME: FutureRelease - Patch directly to nginx to avoid above restriction

export default {
    static_route: '/static/',

    // Used as links only [Currently]
    // Probably this will move and group appropriately to [new] source
    home: '/',
    blogs: '/blogs/',
    howItWorks: '/pages/how-it-works/',
    listHome: '/property/add/',
    dashboard: '/',

    // Source [Entry-points] URLs
    // These URLs redirect to new html pages and are expected to be handled accordingly.
    source: include('/', {
            applyCreate: 'apply/create/:houseUUID',
            applySummary: 'apply/summary/:houseUUID',
            houseCreate: 'property/create/',
            houseEdit: 'property/edit/:houseUUID',
            samplePage: 'property/samplePage',
            userProfile: 'profile/',
        }
    ),

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
        profile: 'user-profile',
        uploadProfilePic: 'upload-profile-pic'
    }),
    cities: include('/cities', {
        postalCodeVerbose: 'postal-code-vo',
        postalCodeDetails: 'postal-code-details/:objID'
    })
};
