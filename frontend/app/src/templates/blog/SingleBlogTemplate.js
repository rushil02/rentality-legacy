import React from "react"
import SingleBlog from "components/blog/views/SingleBlog"
import Layout from "components/layout"
import SEO from "components/seo"

const SingleBlogTemplate = props => {
    let article = props.pageContext.article

    return (
        <Layout {...props}>
            <SEO
                title={`${article.title}: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={article.description}
                image={article.thumbnail}
                imageAlt={article.thumbnail_alt_tags}
                ogType="article"
                pathname={props.location.pathname}
            />
            <SingleBlog {...props} />
        </Layout>
    )
}

export default SingleBlogTemplate
