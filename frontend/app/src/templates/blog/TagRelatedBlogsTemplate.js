import React from "react"
import TagRelatedBlogs from "components/blog/views/TagRelatedBlogs"
import Layout from "components/layout"
import SEO from "components/seo"

const TagRelatedBlogsTemplate = props => (
    <Layout>
        <SEO title="Blog" />
        <TagRelatedBlogs pageContext={props.pageContext} />
    </Layout>
)

export default TagRelatedBlogsTemplate
