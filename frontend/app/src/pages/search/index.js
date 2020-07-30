import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import SearchRouter from "components/search/Router"
import queryString from "query-string"

const SearchPage = props => {
    let searchParams = queryString.parse(props.location.search)
    let location = searchParams.location
    return (
        <Layout {...props}>
            <SEO
                title={`${location}: Rent your home with Rentality in ${location}`}
                description={`Mid term rentals in ${location}. Explore from wide range of rentals in ${location} today!`}
                pathname={props.location.pathname}
            />
            <SearchRouter {...props} />
        </Layout>
    )
}

export default SearchPage
