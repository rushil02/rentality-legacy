import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ApplicationPage from 'containers/application/ApplicationPage';
import BookingConfirmationPage from "./containers/application/BookingConfirmationPage";

import 'index.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                <Route path="/apply/summary/:house_uuid" component={BookingConfirmationPage}/>
                <Route path="/apply/create/:house_uuid" component={ApplicationPage}/>
              </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
