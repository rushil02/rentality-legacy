import React, {Component} from "react";
import App from "./views/App";
import {Location} from "@reach/router"

export default class Router extends Component {

    render() {
        return (
            <Location>
                {props => <App {...this.props} routerProps={props}/>}
            </Location>)
    }
}
