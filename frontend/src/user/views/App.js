import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {reverse} from 'named-urls';

import routes from "../routes";
import CreatePage from "containers/house/CreatePage"

import './index.css';
import Navbar from "containers/common/Navbar";
import Alert from "containers/common/Alert";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <Alert/>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path={routes.source.userAccount}
                            render={(props) => <CreatePage {...props} mode="create"/>}
                        />

                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

