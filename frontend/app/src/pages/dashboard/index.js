import React from "react"
import DashboardContainer from "components/dashboard/views/DashboardContainer"
import Layout from "components/layout"
import SEO from "components/seo"

const DashboardPage = props => (
    <Layout {...props}>
        <SEO
            title="Dashboard: Rentality: Creating a Global Community for Mid-Term Rental"
            description=""
            pathname={props.location.pathname}
        />
        <DashboardContainer {...props} />
    </Layout>
)

export default DashboardPage
