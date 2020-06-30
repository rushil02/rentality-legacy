import React from "react"
import BlogHomeContainer from "components/blog/views/BlogHomeContainer"
import Layout from "components/layout"
import SEO from "components/seo"

const BlogHomePage = () => (
    <Layout>
        <SEO title="Blog" />
        <BlogHomeContainer />
    </Layout>
)

export default BlogHomePage
