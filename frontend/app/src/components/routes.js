import {include} from "named-urls"
import houseListingRoutes from "./houseListing/routes"
import userRoutes from "./userAccount/routes"
import applyRoutes from "./apply/routes"
import welcomeRoutes from "./welcome/routes";
import dashboardRoutes from './dashboard/routes';

export default {
    static_route: "/static/",
    media_route: "/media",

    auth: include("/accounts", {
        login: "login/",
        signup: "signup/",
        logout: "logout/",
    }),

    // Source [Entry-points] URLs
    pages: {
        home: "/",
        searchPage: "search",
        listing: include("/listing", houseListingRoutes.interface),
        user: include("user", userRoutes.interface),
        apply: include("apply", applyRoutes.interface),
        dashboard: include("dashboard", dashboardRoutes.interface),
        welcome: include("welcome", welcomeRoutes.interface),
        faq: "/pages/faq/",
        howItWorks: "/pages/how-it-works/",
        contactUs: "/pages/contact-us/",
    },

    /********************************* APIs *********************************/
    apply: include("/api/app", applyRoutes.APIs),
    user: include("/api/", userRoutes.APIs),
    house: include("/api/property", houseListingRoutes.APIs),
    dashboard: include("/api/dashboard", dashboardRoutes.APIs),
    welcome: include("/api", welcomeRoutes.APIs),

    userNavInfo: "/api/user-nav-info",
    cities: include("/api/cities", {
        postalCodeSuggestions: "postal-code-sugg",
        postalCodeDetails: "postal-code-details/:objID",
        countrySuggestions: "country-sugg",
        countryDetails: "country-details/:objID",
    }),

    search: include("/api/es", {
        house: "house/search",
    }),
    autoSuggest: include("/api/es", {
        location: "location_sugg",
    }),
    sys: include("/api", {messages: "sys-messages"}),

    // promo: include('/promo', {
    //     verifyApplicationDiscount: 'verify-promo-use/application/tenant',
    //     verifyHouseDiscount: 'verify-promo-use/house/home_owner'
    // }),

}
