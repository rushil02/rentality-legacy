import React, {Component} from "react";
import App from "./views/App";

export default class WelcomeRouter extends Component {

    render() {
        return <App {...this.props}/>
    }
}
