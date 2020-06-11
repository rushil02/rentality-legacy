import React, { Component } from "react"
import { UserContext } from "core/auth/userContext"
// import AuthNavbarComponent from "./components/AuthNavbarComponent";
import AnonNavbarComponent from "./components/AnonNavbarComponent"

export default class Navbar extends Component {
    render() {
        return (
            <React.Fragment>
                <UserContext.Consumer>
                    {userContext => {
                        if (userContext.isAuthenticated) {
                            return <AnonNavbarComponent />
                            // return <AuthNavbarComponent user={userContext.data} />;
                        } else {
                            return <AnonNavbarComponent />
                        }
                    }}
                </UserContext.Consumer>
            </React.Fragment>
        )
    }
}
