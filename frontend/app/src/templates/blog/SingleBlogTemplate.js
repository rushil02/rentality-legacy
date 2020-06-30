import React from "react"
import SingleBlog from "components/blog/views/SingleBlog"
import Layout from "components/layout"
import SEO from "components/seo"

const SingleBlogTemplate = () => (
    <Layout>
        <SEO title="Blog" />
        <SingleBlog />
    </Layout>
)

export default SingleBlogTemplate
