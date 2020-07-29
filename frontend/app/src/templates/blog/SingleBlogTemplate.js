import React from "react"
import SingleBlog from "components/blog/views/SingleBlog"
import Layout from "components/layout"
import SEO from "components/seo"

const SingleBlogTemplate = props => {
    let article = props.pathContext.article

    return (
        <Layout {...props}>
            <SEO
                title={`${article.title}: Rentality`}
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
