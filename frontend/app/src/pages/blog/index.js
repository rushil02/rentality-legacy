import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import BlogRouter from "components/blog/Router"

const BlogHomePage = () => (
    <Layout>
        <SEO title="Blog" />
        <BlogRouter />
    </Layout>
)

export default BlogHomePage
