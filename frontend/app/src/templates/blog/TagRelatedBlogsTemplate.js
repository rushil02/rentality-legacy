import React from "react"
import TagRelatedBlogs from "components/blog/views/TagRelatedBlogs"
import Layout from "components/layout"
import SEO from "components/seo"

const TagRelatedBlogsTemplate = () => (
    <Layout>
        <SEO title="Blog" />
        <TagRelatedBlogs />
    </Layout>
)

export default TagRelatedBlogsTemplate
