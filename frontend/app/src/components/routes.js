import {include} from "named-urls"
import houseListingRoutes from "./houseListing/routes"
import userRoutes from "./userAccount/routes"
import applyRoutes from "./apply/routes"
import welcomeRoutes from "./welcome/routes";
import dashboardRoutes from './dashboard/routes';

export default {
    static_route: "/static/",

    // Used as links only [Currently]
    // Probably this will move and group appropriately to [new] source
    home: "/",
    blogs: "/blogs/",
    howItWorks: "/pages/how-it-works/",
    propertyInfo: "/property/info/:houseUUID",
    // dashboard: '/',
    contactUs: "/pages/contact-us/",
    faq: "/pages/faq/",
    houseListing: include("/house/list", {
        create: "create",
        edit: "edit/:houseUUID",
    }),

    auth: include("/accounts", {
        login: "login/",
        signup: "signup/",
        logout: "logout/",
    }),

    // Source [Entry-points] URLs
    pages: {
        home: "/",
        listing: include("/listing", {
            create: 'create',
            edit: 'edit/:houseUUID'
        }),
        user: include("user", userRoutes.interface),
        searchPage: "search",
        apply: include("apply", applyRoutes.interface),
        dashboard: include("dashboard", dashboardRoutes.interface),
        welcome: include("welcome", welcomeRoutes.interface),
    },

    /********************************* APIs *********************************/
    apply: include("/api/app", applyRoutes.APIs),
    user: include("/api/", userRoutes.APIs),
    house: include("/api/property", houseListingRoutes.APIs),
    cities: include("/api/cities", {
        postalCodeSuggestions: "postal-code-sugg",
        postalCodeDetails: "postal-code-details/:objID",
        countrySuggestions: "country-sugg",
        countryDetails: "country-details/:objID",
    }),

    // userNavInfo: "0.0.0.0:8001/user-nav-info",
    // application: include('/apply', {
    //     bookingDetails: 'amount/:houseUUID',
    //     create: 'create-app/:houseUUID',
    //     tenant: 'tenant-details',
    //     complete: 'comp'
    // }),

    // promo: include('/promo', {
    //     verifyApplicationDiscount: 'verify-promo-use/application/tenant',
    //     verifyHouseDiscount: 'verify-promo-use/house/home_owner'
    // }),

    //
    // house: include("/api/property", houseListingRoutes.APIs),
    //
    //

    search: include("/api/es", {
        house: "house/search",
    }),
    autoSuggest: include("/api/es", {
        location: "location_sugg",
    }),
    sys: include("/api", {messages: "sys-messages"}),
    dashboard: include("/api/dashboard", dashboardRoutes.APIs),
    welcome: include("/api/welcome", welcomeRoutes.APIs),

    // search: include("/es", {
    //     house: "house/search",
    //     location: "location_sugg",
    // }),
    // dashboard: include("/dashboard", dashboardRoutes.APIs),
}
