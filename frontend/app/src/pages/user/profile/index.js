import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"

import Loadable from "@loadable/component";

const LoadableApp = Loadable(() => import("components/userAccount/Router"))

const UserProfilePage = props => {
    return (
        <Layout {...props}>
            <SEO
                title={`Rentality: Profile`}
                pathname={props.location.pathname}
            />
            <LoadableApp/>
        </Layout>
    )
}

export default UserProfilePage