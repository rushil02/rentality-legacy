import React from "react"
import BlogSearch from "components/blog/views/BlogSearch"
import Layout from "components/layout"
import SEO from "components/seo"

const BlogSearchPage = props => (
    <Layout>
        <SEO title="Blog Search" />
        <BlogSearch {...props} />
    </Layout>
)

export default BlogSearchPage
