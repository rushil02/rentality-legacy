import React from "react"
import SingleBlog from "components/blog/views/SingleBlog"
import Layout from "components/layout"
import SEO from "components/seo"

const SingleBlogTemplate = props => (
    <Layout>
        <SEO title="Blog" />
        <SingleBlog pageContext={props.pageContext} />
    </Layout>
)

export default SingleBlogTemplate
