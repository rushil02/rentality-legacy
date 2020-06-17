import routes from "components/routes";
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary";
import Error404 from "core/errorHelpers/Error404";
import App from "./views/App";


export default class Router extends Component {

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path={routes.pages.dashboard.base}
                                render={(props) => <App routerProps={props}/>}
                            />
                            <Route render={(props) => <Error404/>}/>
                        </Switch>
                    </BrowserRouter>
                </ComponentErrorBoundary>
            </React.Fragment>
        );
    }
}
