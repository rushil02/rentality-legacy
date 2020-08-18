import React from "react"
import Policy from "components/flatpages/Policy"
import Layout from "components/layout"
import SEO from "components/seo"

const PolicyTemplate = props => {
    let policy = props.pageContext.policy

    return (
        <Layout {...props}>
            <SEO
                title={`Policy: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Mid term rentals in. Explore from wide range of rentals in today!`}
                pathname={props.location.pathname}
            />
            <Policy {...props} />
        </Layout>
    )
}

export default PolicyTemplate
