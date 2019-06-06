import React, {Component} from 'react';
import {UserContext} from "../../auth/userContext";
import AuthNavbarComponent from "./components/AuthNavbarComponent";
import AnonNavbarComponent from "./components/AnonNavbarComponent";


class Navbar extends Component {

    render() {
        return (
            <React.Fragment>
                <UserContext.Consumer>
                    {userContext => {
                        if (userContext.isAuthenticated) {
                            return <AuthNavbarComponent user={userContext.data}/>
                        } else {
                            return <AnonNavbarComponent/>
                        }
                    }}
                </UserContext.Consumer>
            </React.Fragment>
        );
    }
}

export default Navbar;