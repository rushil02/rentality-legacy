import React from "react"
import BlogHomeContainer from "components/blog/views/BlogHomeContainer"
import Layout from "components/layout"
import SEO from "components/seo"

const BlogHomePage = props => (
    <Layout {...props}>
        <SEO
            title="Blog: Rentality: Creating a Global Community for Mid-Term Rental"
            description=""
            pathname={props.location.pathname}
        />
        <BlogHomeContainer {...props} />
    </Layout>
)

export default BlogHomePage
