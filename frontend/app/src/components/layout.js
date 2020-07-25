/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import Header from "./header"
import Alert from "core/alert/Alert"
import { UserStore } from "core/auth/userContext"
import Navbar from "core/navbar/views/Navbar"
import Footer from "core/footer/views/Footer"

// import ComponentErrorBoundary from "../../../old/src/core/errorHelpers/ComponentErrorBoundary";

const Layout = props => {
    // const data = useStaticQuery(graphql`
    //     query SiteTitleQuery {
    //         site {
    //             siteMetadata {
    //                 title
    //             }
    //         }
    //     }
    // `)

    return (
        <div>
            {/*<Header siteTitle={data.site.siteMetadata.title}/>*/}
            <UserStore>
                <Alert />
                <Navbar location={props.location} />
                <main>{props.children}</main>
                <Footer />
            </UserStore>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
