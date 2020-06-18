import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
import Error404 from "core/errorHelpers/Error404";

const NotFoundPage = () => (
    <Layout>
        <SEO title="404: Not found" />
        <Error404/>
    </Layout>
)

export default NotFoundPage
