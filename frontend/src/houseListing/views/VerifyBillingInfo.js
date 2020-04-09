import React, {Component} from 'react';
import {verifyUserCanStartListing} from "../services";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";

export default class VerifyBillingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiStatus: "loading",
            verified: false
        }
    }

    componentDidMount() {
        verifyUserCanStartListing()
            .then(result => {
                    this.setState({apiStatus: "done", verified: result.verified})
                }
            ).catch(error => {
            this.setState({apiStatus: "error"})
        })
    }

    getContent() {
        if (this.state.verified) {
            return this.props.children
        } else {
            return <NewContainer/>
        }
    }

    render() {
        return (
            <RequestErrorBoundary status={this.state.apiStatus}>
                {this.getContent()}
            </RequestErrorBoundary>
        )
    }
}