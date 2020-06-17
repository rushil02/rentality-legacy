import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"
import WelcomeRouter from "components/welcome/Router";


const HomePage = () => (
    <Layout>
        <SEO title="Home" />
        <WelcomeRouter/>
    </Layout>
)

export default HomePage
