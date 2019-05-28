import React, {Component} from 'react';

import {createContext} from 'react';
import {getUserNavDetails} from "./services";
import {User} from "./models";


export const UserContext = createContext({});


export class UserStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            userDetails: {
                isAuthenticated: () => this.state.authenticated,
                data: new User({}),
                sync: () => this.setUser()
            },
        };
    }

    setUser = () => {
        getUserNavDetails()
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    authenticated:true,
                    userDetails: {
                        ...prevState.userDetails,
                        data: result
                    }
                }));
            })
            .catch(error => {
                console.log(error);
                return error
            });
    };


    componentDidMount() {
        this.setUser();
    }


    render() {
        console.log(this.state.userDetails);
        return (
            <UserContext.Provider value={this.state.userDetails}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}