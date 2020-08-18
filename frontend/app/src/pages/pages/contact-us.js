import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import ContactUs from "components/flatpages/ContactUs"

const ContactUsPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`Contact Us: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Mid term rentals in. Explore from wide range of rentals in today!`}
                pathname={props.location.pathname}
            />
            <ContactUs {...props} />
        </Layout>
    )
}

export default ContactUsPage
