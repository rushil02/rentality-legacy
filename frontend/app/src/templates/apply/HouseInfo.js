import React from "react"
import HouseDetailPage from "components/apply/views/houseDetail/HouseDetailPage"
import Layout from "components/layout"
import SEO from "components/seo"

const HouseDetailPageTemplate = props => {
    let verbose = props.pageContext.tagAndArticles.verbose

    return (
        <Layout {...props}>
            <SEO
                title={`${verbose}: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Get latest blogs on ${verbose}. Rentality, the leading marketplace for monthly rental in Australia`}
                pathname={props.location.pathname}
            />
            <HouseDetailPage {...props} />
        </Layout>
    )
}

export default HouseDetailPageTemplate
