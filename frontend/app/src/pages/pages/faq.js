import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import FAQ from "components/flatpages/FAQ"

const FAQPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`FAQ: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Mid term rentals in. Explore from wide range of rentals in today!`}
                pathname={props.location.pathname}
            />
            <FAQ {...props} />
        </Layout>
    )
}

export default FAQPage
