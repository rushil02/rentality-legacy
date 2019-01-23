import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ApplicationPage from 'containers/application/index';
import 'index.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/apply/create/:house_uuid' component={ApplicationPage}/>
                    {/*<Route exact path='/apply/create2' component={Messaging}/>*/}
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
