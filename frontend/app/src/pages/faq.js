import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import FAQ from "components/flatpages/FAQ"

const FAQPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`FAQ: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Here are most frequently asked questions about registration, 
                booking, payment & all about mid-term rentals for rent in Sydney, 
                Melbourne, Brisbane, Perth, Gold Coast and surrounding areas.`}
                pathname={props.location.pathname}
            />
            <FAQ {...props} />
        </Layout>
    )
}

export default FAQPage
