import React from "react"
import Policy from "components/flatpages/Policy"
import Layout from "components/layout"
import SEO from "components/seo"

const PolicyTemplate = props => {
    let policy = props.pageContext.policy
    let policyTitle, policyDescription
    if (policy.code_name === "PP") {
        policyTitle = `Privacy Policy: Rentality: Creating a Global Community for Mid-Term Rental`
        policyDescription = `Privacy Policy for Rentality. Please read our privacy policy carefully before using the website.`
    } else if (policy.code_name === "CP") {
        policyTitle = `Cookie Policy: Rentality: Creating a Global Community for Mid-Term Rental`
        policyDescription = `Cookie Policy for Rentality. Please read our privacy policy carefully before using the website.`
    } else if (policy.code_name === "ToS") {
        policyTitle = `Terms of Service: Rentality: Creating a Global Community for Mid-Term Rental`
        policyDescription = `Terms and conditions for owners, tenants & visitors of the Rentality. 
        Please read our terms of service carefully before using this website.`
    }

    return (
        <Layout {...props}>
            <SEO title={policyTitle} description={policyDescription} pathname={props.location.pathname} />
            <Policy {...props} />
        </Layout>
    )
}

export default PolicyTemplate
