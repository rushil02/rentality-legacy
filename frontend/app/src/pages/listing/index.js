import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import Loadable from "@loadable/component"

const LoadableApp = Loadable(() => import("components/houseListing/Router"))

const HouseListingPage = props => (
    <Layout {...props}>
        <SEO
            title="List your home on Rentality: Creating a Global Community for Mid-Term Rental"
            description=""
            pathname={props.location.pathname}
        />
        <LoadableApp />
    </Layout>
)

export default HouseListingPage
