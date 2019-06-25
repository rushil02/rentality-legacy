import React, { Component } from "react";
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary";
import App from "./views/App";

export default class Router extends Component {

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <App routerProps={this.props}/>
                </ComponentErrorBoundary>
            </React.Fragment>
        );
    }
}
