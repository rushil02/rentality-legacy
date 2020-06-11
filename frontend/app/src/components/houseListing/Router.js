import App from "./views/App"
import React, {Component} from "react"
import {Router} from "@reach/router"
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary"
import Error404 from "core/errorHelpers/Error404"
import PrivateRoute from "core/auth/utils";

export default class MainApp extends Component {

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <Router basepath={"/listing"}>
                        <PrivateRoute path={'/create'} component={App} mode={'create'}/>
                        <PrivateRoute path={'/edit/:houseUUID/:id'} component={App} mode={"edit"}/>
                        <Error404 default/>
                    </Router>
                </ComponentErrorBoundary>
            </React.Fragment>
        )
    }
}
