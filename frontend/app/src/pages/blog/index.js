import React from "react"
import BlogHomeContainer from "components/blog/views/BlogHomeContainer"
import Layout from "components/layout"
import SEO from "components/seo"

const BlogHomePage = props => (
    <Layout {...props}>
        <SEO
            title={`Blogs: Rentality: Creating a Global Community for Mid-Term Rental`}
            description={`Blogs with insightful article & conversations that solves the 
            problem of finding affordable mid-term home rentals in Sydney, Melbourne,
            Brisbane, Perth, Gold Coast and surrounding areas.`}
            pathname={props.location.pathname}
        />
        <BlogHomeContainer {...props} />
    </Layout>
)

export default BlogHomePage
