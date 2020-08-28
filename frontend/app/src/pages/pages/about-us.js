import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import AboutUs from "components/flatpages/AboutUs"

const AboutPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`About Us: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`At Rentality, we offer a marketplace that solves the problem 
                of finding affordable mid-term home rentals for rent in Melbourne, Sydney,
                Brisbane, Perth, Gold Coast and surrounding areas.`}
                pathname={props.location.pathname}
            />
            <AboutUs {...props} />
        </Layout>
    )
}

export default AboutPage
