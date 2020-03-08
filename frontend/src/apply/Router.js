import routes from "routes";
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary";
import Error404 from "core/errorHelpers/Error404";
import HouseDetailPage from "./views/houseDetail/HouseDetailPage";


export default class Router extends Component {

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path={routes.react.apply.houseInfo}
                                render={(props) => <HouseDetailPage routerProps={props}/>}
                            />
                            <Route render={(props) => <Error404/>}/>
                        </Switch>
                    </BrowserRouter>
                </ComponentErrorBoundary>
            </React.Fragment>
        );
    }
}