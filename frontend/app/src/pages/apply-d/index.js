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
                title="Page 32332"
                description="About the property truncated to 160 characters"
                pathname={props.location.pathname}
            />
            <ComponentErrorBoundary>
                <Router basepath={"/apply/info"}>
                    <HouseDetailPage path={"/:houseUUID"}/>
                    <Error404 default/>
                </Router>
            </ComponentErrorBoundary>
        </Layout>
    )
}

export default ApplyPage
