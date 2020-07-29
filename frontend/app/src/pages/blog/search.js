import React from "react"
import BlogSearch from "components/blog/views/BlogSearch"
import Layout from "components/layout"
import SEO from "components/seo"
import queryString from "query-string"

const BlogSearchPage = props => {
    console.log(props)
    let searchParams = queryString.parse(props.location.search)
    return (
        <Layout {...props}>
            <SEO
                title={`Search results for ${searchParams.q}: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Blog results for ${searchParams.q}. Rentality, the leading marketplace for monthly rental in Australia`}
                pathname={props.location.pathname}
            />
            <BlogSearch {...props} />
        </Layout>
    )
}

export default BlogSearchPage
