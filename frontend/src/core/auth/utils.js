import React from "react";
import routes from "routes";
import {Route} from 'react-router-dom';
import {UserContext} from "./userContext";
import {ComponentLoadingSpinner} from "../loadingSpinners/LoadingSpinner";
import {reverse} from "named-urls";


// From: https://tylermcginnis.com/react-router-protected-routes-authentication/
export const PrivateRoute = (routerArgs) => (
    <UserContext.Consumer>
        {user => {
            if (user.isSynced) {
                if (user.isAuthenticated) {
                    return <Route {...routerArgs}/>
                } else {
                    window.location.href = reverse(routes.auth.login) + "?next=" + routerArgs.location.pathname;
                    return null
                }
            } else {
                return <ComponentLoadingSpinner/>
            }
        }}
    </UserContext.Consumer>
);
