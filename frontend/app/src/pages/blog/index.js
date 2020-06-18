import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
// import Navbar from "../components/navbar/views/Navbar";
import Footer from "components/footer/Footer"
// import Loadable from "@loadable/component"
import BlogRouter from "components/blog/Router"

const BlogHomePage = () => (
    <Layout>
        <SEO title="Blog" />
        <BlogRouter />
        {/*<Navbar/>*/}
        {/* <LoadableApp /> */}
        {/*<Footer/>*/}
    </Layout>
)

export default BlogHomePage
