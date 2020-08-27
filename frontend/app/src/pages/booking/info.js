import React from "react"
import BookingSuccessPage from "components/apply/views/successPage/BookingSuccessPage"
import Layout from "components/layout"
import SEO from "components/seo"
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary";
import {Router} from "@reach/router";
import Error404 from "core/errorHelpers/Error404";

const BookingInfoPage = props => (
    <Layout {...props}>
        <SEO
            title="Booking | Rentality: Creating a Global Community for Mid-Term Rental"
            description=""
            pathname={props.location.pathname}
        />
        <ComponentErrorBoundary>
            <Router basepath={"/booking/info"}>
                <BookingSuccessPage path={"/:applicationUUID"}/>
                <Error404 default/>
            </Router>
        </ComponentErrorBoundary>
    </Layout>
)

export default BookingInfoPage