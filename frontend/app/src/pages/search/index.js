import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import SearchRouter from "components/search/Router";


const SearchPage = () => (
    <Layout>
        <SEO title="Search"/>
        <SearchRouter/>
    </Layout>
)

export default SearchPage
