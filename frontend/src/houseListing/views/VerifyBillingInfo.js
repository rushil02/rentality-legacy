import React, {Component} from "react";
import {verifyUserCanStartListing} from "../services";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";
import UserProfileContainer from "./tellUsMore/UserProfileContainer";

export default class VerifyBillingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiStatus: "loading",
            verified: false,
        };
    }

    componentDidMount() {
        this.verifyUser();
    }

    verifyUser = () => {
        verifyUserCanStartListing()
            .then((result) => {
                this.setState({apiStatus: "done", verified: result.verified});
            })
            .catch((error) => {
                this.setState({apiStatus: "error"});
            });
    };

    getContent() {
        if (this.state.verified) {
            return this.props.children;
        } else {
            return <UserProfileContainer verifyUser={this.verifyUser} />;
        }
    }

    render() {
        return <RequestErrorBoundary status={this.state.apiStatus}>{this.getContent()}</RequestErrorBoundary>;
    }
}
