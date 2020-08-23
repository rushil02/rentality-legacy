import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"

const IndexPage = props => (
    <Layout {...props}>
        <SEO
            title="Page 32332"
            description="About the property truncated to 160 characters"
            pathname={props.location.pathname}
        />
        {/* <HouseDetailPage {...props} /> */}
    </Layout>
)

export default IndexPage
