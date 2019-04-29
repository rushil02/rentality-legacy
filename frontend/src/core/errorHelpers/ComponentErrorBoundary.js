import {Component} from 'react';
import React from "react";
import {reverse} from 'named-urls';
import routes from 'routes';

export default class ComponentErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {error: null, errorInfo: null};
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })

        // You can also log error messages to an error reporting service here
        // TODO: Log all Errors here !!! Separate DB Required !TSDB
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <React.Fragment>
                    <div className="container-fluid">
                        <div className="row" style={{paddingTop: "10%", marginBottom: "10%"}}>
                            <div className="col-sm-3"/>
                            <div className="col-sm-6">
                                <div className="card page-error-card">
                                    <div className="card-body">
                                        <h1>Something went wrong!</h1>

                                        <p>
                                            <br/>
                                        </p>
                                        <div className="float-right">
                                        <a href={reverse(routes.contactUs)} className="btn btn-outline-primary">
                                            Contact us
                                        </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3"/>
                        </div>
                    </div>
                </React.Fragment>

            );
        }
        // Normally, just render children
        return this.props.children;
    }
}