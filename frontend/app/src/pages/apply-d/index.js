import React from "react"
import {Router} from "@reach/router"
import Layout from "components/layout"
import SEO from "components/seo"
import HouseDetailPage from "components/apply/views/houseDetail/HouseDetailPage"
import Error404 from "core/errorHelpers/Error404";
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary";

const ApplyPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title="Rentality: Creating a Global Community for Mid-Term Rental"
                description="Rent your home for the next few months on Rentality, the leading marketplace for monthly rental in Australia"
                pathname={props.location.pathname}
            />
            <ComponentErrorBoundary>
                <Router basepath={"/apply/info"}>
                    <HouseDetailPage path={"/:houseUUID"} />
                    <Error404 default />
                </Router>
            </ComponentErrorBoundary>
        </Layout>
    )
}

export default ApplyPage
