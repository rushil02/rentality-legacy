import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import routes from "../routes";
import UserProfilePage from "containers/user/profile"

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
                            path={routes.source.userProfile}
                            render={(props) => <UserProfilePage {...props} mode="edit"/>}
                        />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
