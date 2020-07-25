import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import SearchRouter from "components/search/Router"

const SearchPage = props => (
    <Layout {...props}>
        <SEO title="Search" />
        <SearchRouter {...props} />
    </Layout>
)

export default SearchPage
