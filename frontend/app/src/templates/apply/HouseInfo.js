import React from "react"
import HouseDetailPage from "components/apply/views/houseDetail/HouseDetailPage"
import Layout from "components/layout"
import SEO from "components/seo"

const HouseDetailPageTemplate = props => {
    let house = props.pageContext.house

    return (
        <Layout {...props}>
            <SEO
                title={`${house.title}: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={house.description.substring(0, 160)}
                pathname={props.location.pathname}
            />
            <HouseDetailPage {...props} />
        </Layout>
    )
}

export default HouseDetailPageTemplate
