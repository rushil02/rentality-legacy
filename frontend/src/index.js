import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ApplicationPage from 'containers/application/ApplicationPage';
import 'index.css';
import BookingConfirmationPage from "./containers/application/BookingConfirmationPage";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/apply/create/:house_uuid' component={BookingConfirmationPage}/>
                    {/*<Route exact path='/apply/create2' component={Messaging}/>*/}
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
