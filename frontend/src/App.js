import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {loadProgressBar} from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

import routes from "./routes";

import './theme.css';
import Navbar from "core/navbar/views/Navbar";
import Alert from "core/alert/Alert";

import Error404 from "core/errorHelpers/Error404";
import Footer from "core/footer/Footer";
import ComponentErrorBoundary from "./core/errorHelpers/ComponentErrorBoundary";
import {ComponentLoadingSpinner} from "./core/loadingSpinners/LoadingSpinner";
import {UserStore} from "core/auth/userContext";
import {PrivateRoute} from "core/auth/utils";

const HouseListing = React.lazy(() => import("houseListing/Router"));
const User = React.lazy(() => import("userAccount/Router"));
const Apply = React.lazy(() => import("apply/Router"));
const Dashboard = React.lazy(() => import("dashboard/Router"));
const SearchPage = React.lazy(() => import ("search/Router"));


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <UserStore>
                        <Navbar/>
                        <Alert/>
                        <BrowserRouter>
                            <Switch>
                                <PrivateRoute
                                    path={routes.react.houseListing.base}
                                    render={(props) =>
                                        <Suspense fallback={<ComponentLoadingSpinner/>}>
                                            <HouseListing {...props}/>
                                        </Suspense>}
                                />
                                <Route
                                   path={routes.react.searchPage}
                                   render={
                                       (props) =>
                                          <Suspense fallback={<ComponentLoadingSpinner />}>
                                                <SearchPage {...props} />
                                            </Suspense> }
                                />
                                 <Route
                                    path={routes.react.apply.base}
                                    render={
                                        (props) =>
                                            <Suspense fallback={<ComponentLoadingSpinner />}>
                                                <Apply {...props} />
                                            </Suspense> }
                                />
                                <PrivateRoute
                                    path={routes.react.user.base}
                                    render={(props) =>
                                        <Suspense fallback={<ComponentLoadingSpinner/>}>
                                            <User {...props}/>
                                        </Suspense>}
                                />
                                <PrivateRoute
                                    path={routes.react.dashboard.base}
                                    render={(props) =>
                                        <Suspense fallback={<ComponentLoadingSpinner/>}>
                                            <Dashboard {...props}/>
                                        </Suspense>}
                                />
                                <Route
                                    render={(props) => <Error404/>}
                                />
                            </Switch>
                        </BrowserRouter>
                        <Footer/>
                    </UserStore>
                </ComponentErrorBoundary>
            </React.Fragment>
        );
    }
}

loadProgressBar({showSpinner: false});

ReactDOM.render(<App/>, document.getElementById('root'));
