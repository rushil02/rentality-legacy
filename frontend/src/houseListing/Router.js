import routes from "routes";
import App from "./views/App";
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary";
import Error404 from "core/errorHelpers/Error404";


export default class Router extends Component {

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path={routes.react.houseListing.create}
                                render={(props) => <App routerProps={props} mode={'create'}/>}
                            />
                            <Route
                                path={routes.react.houseListing.edit}
                                render={(props) => <App routerProps={props} mode={'edit'}/>}
                            />
                            <Route render={(props) => <Error404/>}/>
                        </Switch>
                    </BrowserRouter>
                </ComponentErrorBoundary>
            </React.Fragment>
        );
    }
}
