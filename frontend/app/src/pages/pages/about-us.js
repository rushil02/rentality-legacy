import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import AboutUs from "components/flatpages/AboutUs"

const AboutPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`About Us: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Mid term rentals in. Explore from wide range of rentals in today!`}
                pathname={props.location.pathname}
            />
            <AboutUs {...props} />
        </Layout>
    )
}

export default AboutPage
