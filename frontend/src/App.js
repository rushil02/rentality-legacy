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

const HouseListing = React.lazy(() => import("houseListing/Router"));

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
                                <Route
                                    path={routes.react.houseListing.base}
                                    render={(props) =>
                                        <Suspense fallback={<ComponentLoadingSpinner/>}>
                                            <HouseListing {...props}/>
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
