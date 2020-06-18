import React from "react"
import {PageRoutes} from "components/routes"
import {UserContext} from "./userContext"
import {ComponentLoadingSpinner} from "core/UIComponents/loadingSpinners/LoadingSpinner"
import {reverse} from "named-urls"


export const PrivateRoute = ({component: Component, location, ...componentProps}) => {
    return (
        <UserContext.Consumer>
            {user => {
                if (user.isSynced) {
                    if (user.isAuthenticated) {
                        return <Component {...componentProps} />
                    } else {
                        window.location.href = reverse(PageRoutes.auth.login) + "?next=" + location.pathname;
                        return null
                    }
                } else {
                    return <ComponentLoadingSpinner/>
                }
            }}
        </UserContext.Consumer>
    )
}
export default PrivateRoute