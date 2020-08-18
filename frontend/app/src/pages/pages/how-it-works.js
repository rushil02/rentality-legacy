import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import HowItWorks from "components/flatpages/HowItWorks"

const HowItWorksPage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`How It Works: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Mid term rentals in. Explore from wide range of rentals in today!`}
                pathname={props.location.pathname}
            />
            <HowItWorks {...props} />
        </Layout>
    )
}

export default HowItWorksPage
