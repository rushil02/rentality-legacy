import React from "react"
import SingleBlog from "components/blog/views/SingleBlog"
import Layout from "components/layout"
import SEO from "components/seo"

const SingleBlogTemplate = props => (
    <Layout {...props}>
        <SEO title="Blog" />
        <SingleBlog {...props} />
    </Layout>
)

export default SingleBlogTemplate
