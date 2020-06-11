import React from "react"
import { Link } from "gatsby"

import Layout from "components/layout"
import Image from "components/image"
import SEO from "components/seo"
import Navbar from "components/navbar/views/Navbar"
import Footer from "components/footer/Footer";
import HouseDetailPage from "components/apply/views/houseDetail/HouseDetailPage";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <Navbar/>
        <HouseDetailPage/>
        <Footer/>
    </Layout>
)

export default IndexPage
