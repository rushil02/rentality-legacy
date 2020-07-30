import React from "react"
import TagRelatedBlogs from "components/blog/views/TagRelatedBlogs"
import Layout from "components/layout"
import SEO from "components/seo"

const TagRelatedBlogsTemplate = props => {
    let verbose = props.pageContext.tagAndArticles.verbose

    return (
        <Layout {...props}>
            <SEO
                title={`${verbose}: Rentality: Creating a Global Community for Mid-Term Rental`}
                description={`Get latest blogs on ${verbose}. Rentality, the leading marketplace for monthly rental in Australia`}
                pathname={props.location.pathname}
            />
            <TagRelatedBlogs {...props} />
        </Layout>
    )
}

export default TagRelatedBlogsTemplate
