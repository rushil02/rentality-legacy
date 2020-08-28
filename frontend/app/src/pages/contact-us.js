import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import ContactUs from "components/flatpages/ContactUs"

const ContactUsPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`Contact Us: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`If you have any questions, concerns or issues 
                regarding renting home or want to list your home reach us at admin@rentality.com.au`}
                pathname={props.location.pathname}
            />
            <ContactUs {...props} />
        </Layout>
    )
}

export default ContactUsPage
