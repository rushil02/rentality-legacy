import {include} from "named-urls";
import houseListingRoutes from "houseListing/routes";
import userRoutes from "userAccount/routes";
import applyRoutes from "apply/routes";
import dashboardRoutes from "dashboard/routes";
import welcomeRoutes from "welcome/routes";

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

    auth: include("/accounts", {
        login: "login/",
        signup: "signup/",
        logout: "logout/",
    }),

    // Source [Entry-points] URLs
    // These URLs represent browser state
    // FIXME: Prepend needs to be removed after complete frontend migrations to react
    react: include("/rep", {
        houseListing: include("house/list", houseListingRoutes.interface),
        user: include("user", userRoutes.interface),
        searchPage: "search",
        apply: include("apply", applyRoutes.interface),
        dashboard: include("dashboard", dashboardRoutes.interface),
        welcome: include("welcome", welcomeRoutes.interface),
    }),

    /********************************* APIs *********************************/
    userNavInfo: "/user-nav-info",
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

    apply: include("/app", applyRoutes.APIs),

    house: include("/property", houseListingRoutes.APIs),

    user: include("/", userRoutes.APIs),

    cities: include("/cities", {
        postalCodeSuggestions: "postal-code-sugg",
        postalCodeDetails: "postal-code-details/:objID",
        countrySuggestions: "country-sugg",
        countryDetails: "country-details/:objID",
    }),
    search: include("/es", {
        house: "house/search",
    }),
    autoSuggest: include("/es", {
        location: "location_sugg",
    }),
    sys: include("/", {messages: "sys-messages"}),
    dashboard: include("/dashboard", dashboardRoutes.APIs),
    welcome: include("/welcome", welcomeRoutes.APIs),
};
