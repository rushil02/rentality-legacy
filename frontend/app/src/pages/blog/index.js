import React from "react"
import BlogHomeContainer from "components/blog/views/BlogHomeContainer"
import Layout from "components/layout"
import SEO from "components/seo"

const BlogHomePage = props => (
    <Layout {...props}>
        <SEO title="Blog" />
        <BlogHomeContainer {...props} />
    </Layout>
)

export default BlogHomePage
