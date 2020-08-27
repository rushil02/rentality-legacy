import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import HowItWorks from "components/flatpages/HowItWorks"

const HowItWorksPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`How It Works: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Know how Rentality platform works, the simple and easy steps to rent your next home.`}
                pathname={props.location.pathname}
            />
            <HowItWorks {...props} />
        </Layout>
    )
}

export default HowItWorksPage
