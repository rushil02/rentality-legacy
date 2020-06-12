import React, {Component} from "react";
import {UserContext} from "../../auth/userContext";
import AuthFooterComponent from "./components/AuthFooterComponent";
import AnonFooterComponent from "./components/AnonFooterComponent";

class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <UserContext.Consumer>
                    {(userContext) => {
                        if (userContext.isAuthenticated) {
                            return <AuthFooterComponent user={userContext.data} />;
                        } else {
                            return <AnonFooterComponent />;
                        }
                    }}
                </UserContext.Consumer>
            </React.Fragment>
        );
    }
}

export default Footer;
