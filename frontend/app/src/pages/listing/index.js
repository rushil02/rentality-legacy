import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"
// import Navbar from "../components/navbar/views/Navbar";
import Footer from "components/footer/Footer";
import Loadable from "@loadable/component"

const LoadableApp = Loadable(() => import("components/houseListing/Router"))

const SecondPage = () => (
    <Layout>
        <SEO title="Page two" />
        {/*<Navbar/>*/}
        <LoadableApp/>
        {/*<Footer/>*/}
    </Layout>
)

export default SecondPage
