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
                description="Rent your home for the next few months on Rentality, the leading marketplace for monthly rental in Australia"
                keywords="short term rentals, short term accommodations
sydney, apartments for rent brisbane, furnished apartments melbourne"
                microdata={microdata}
                pathname={props.location.pathname}
            />
            <WelcomeRouter {...props} />
        </Layout>
    )
}

export default HomePage
