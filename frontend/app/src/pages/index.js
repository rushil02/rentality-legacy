import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import WelcomeRouter from "components/welcome/Router"

const HomePage = props => {
    let microdata = `{
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: "https://rentality.com.au",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://rentality.com.au/search?location={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    }`

    return (
        <Layout {...props}>
            <SEO
                title="Rentality: Creating a Global Community for Mid-Term Rental"
                description="Rentality offers medium term fully
furnished apartments for rent in Sydney, Melbourne, Brisbane, Perth, Gold Coast and surrounding areas."
                keywords="short term rentals, short term accommodations
sydney, apartments for rent brisbane, furnished apartments melbourne"
                microdata={microdata}
            />
            <WelcomeRouter {...props} />
        </Layout>
    )
}

export default HomePage
