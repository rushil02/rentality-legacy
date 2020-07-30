import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import Error404 from "core/errorHelpers/Error404"

const NotFoundPage = props => (
    <Layout {...props}>
        <SEO
            title="Page Not Found: Rentality"
            description="Oops, the page you're looking for does not exist. It may be due to a typo or you can report the problem if you think something is broken."
            pathname={props.location.pathname}
        />
        <Error404 {...props} />
    </Layout>
)

export default NotFoundPage
