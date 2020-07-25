import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import HouseDetailPage from "components/apply/views/houseDetail/HouseDetailPage"

const IndexPage = props => (
    <Layout {...props}>
        <SEO title="Home" />
        <HouseDetailPage {...props} />
    </Layout>
)

export default IndexPage
