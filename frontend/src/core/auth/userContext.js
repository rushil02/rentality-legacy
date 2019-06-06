import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {createContext} from 'react';

import {getUserNavDetails} from "./services";
import {User} from "./models";


export const UserContext = createContext({});


export class UserStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isSynced: false,
            data: new User({}, 'empty'),
            sync: () => this.setUser()
        };
    }

    setUser = () => {
        getUserNavDetails()
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    isAuthenticated: true,
                    isSynced: true,
                    data: result
                }));
            })
            .catch(error => {
                this.setState(prevState => ({
                    ...prevState,
                    isSynced: true,
                }));
            })
    };


    componentDidMount() {
        this.setUser();
    }


    render() {
        console.log("usercollection", this.state);
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}