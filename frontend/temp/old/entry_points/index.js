import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {reverse} from 'named-urls';

import routes from "routes";
import ApplicationPage from 'containers/application/ApplicationPage';
import BookingConfirmationPage from "containers/application/BookingConfirmationPage";

import './index.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                <Route path={routes.source.applySummary} component={BookingConfirmationPage}/>
                <Route path={routes.source.applyCreate} component={ApplicationPage}/>
              </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
