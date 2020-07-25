import React from "react"
import TagRelatedBlogs from "components/blog/views/TagRelatedBlogs"
import Layout from "components/layout"
import SEO from "components/seo"

const TagRelatedBlogsTemplate = props => (
    <Layout {...props}>
        <SEO title="Blog" />
        <TagRelatedBlogs {...props} />
    </Layout>
)

export default TagRelatedBlogsTemplate
