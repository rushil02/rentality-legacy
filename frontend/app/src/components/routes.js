import { include } from "named-urls"
import houseListingRoutes from "./houseListing/routes"
import userRoutes from "./userAccount/routes"
import applyRoutes from "./apply/routes"
import welcomeRoutes from "./welcome/routes"
import dashboardRoutes from "./dashboard/routes"
import blogRoutes from "./blog/routes"

export default {
    static_route: "/static/",
    media_route: "/media",
}

export const PageRoutes = {
    home: "/",
    searchPage: "search",
    listing: include("/listing", houseListingRoutes.interface),
    user: include("user", userRoutes.interface),
    apply: include("apply", applyRoutes.interface),
    dashboard: include("dashboard", dashboardRoutes.interface),
    welcome: include("welcome", welcomeRoutes.interface),
    blog: include("blog", blogRoutes.interface),
    faq: "/pages/faq/",
    howItWorks: "/pages/how-it-works/",
    contactUs: "/pages/contact-us/",
    auth: include("/accounts", {
        login: "login/",
        signup: "signup/",
        logout: "logout/",
    }),
}

export const APIRoutes = include("/api", {
    apply: include("app", applyRoutes.APIs),
    user: userRoutes.APIs,
    welcome: welcomeRoutes.APIs,
    sys: { messages: "sys-messages" },
    house: include("property", {
        ...houseListingRoutes.APIs,
        filterOptions: "filter-options",
    }),
    dashboard: include("dashboard", dashboardRoutes.APIs),
    blog: include("blog", blogRoutes.APIs),
    search: include("es", {
        house: "house/search",
        blog: "blog",
    }),
    paymentGateway: include("pg", {
        createPaymentInfo: "add-ho-acc/:pgCode/:houseUUID",
        updatePaymentInfo: "update-ho-acc/:pgCode",
    }),
    cities: include("cities", {
        postalCodeSuggestions: "postal-code-sugg",
        postalCodeDetails: "postal-code-details/:objID",
        countrySuggestions: "country-sugg",
        countryDetails: "country-details/:objID",
    }),
    autoSuggest: include("es", {
        location: "location_sugg",
    }),
    userNavInfo: "user-nav-info",
})
