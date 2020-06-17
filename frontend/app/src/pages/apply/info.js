import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import HouseDetailPage from "components/apply/views/houseDetail/HouseDetailPage";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <HouseDetailPage/>
    </Layout>
)

export default IndexPage
