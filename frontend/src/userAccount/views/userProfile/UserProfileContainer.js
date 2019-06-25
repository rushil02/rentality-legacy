import React, {Component} from 'react';

import UserProfileComponent from "./UserProfileComponent";
import {UserPII} from "userAccount/models";
import {patchUserProfileData, getUserProfileData} from "userAccount/services";


export default class UserProfileContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: new UserPII({}, 'empty'),
            imagePath: null,
        };
    }

    componentDidMount() {
        getUserProfileData()
            .then(result => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        data: result,
                    })
                );
            });
    }

    onFieldChange = (field, value) => {
        console.log(field, value);
        this.setState(prevState => ({
            ...prevState,
            data: prevState.data.setData(field, value)
        }));
    };

    onSave = () => {
        const that = this;
        return new Promise(function (resolve, reject) {
            patchUserProfileData(that.state.data)
                .then(result => {
                    that.setState(prevState => (
                        {
                            ...prevState,
                            data: result,
                        })
                    );
                    resolve(result);
                })
                .catch(error => {
                    that.forceUpdate();
                    reject(error)
                })

        })
    };

    render() {
        return (
            <UserProfileComponent
                onFieldChange={this.onFieldChange}
                errors={this.state.data.errors}
                firstName={this.state.data.getData('firstName')}
                lastName={this.state.data.getData('lastName')}
                contactNum={this.state.data.getData('contactNum')}
                sex={this.state.data.getData('sex')}
                email={this.state.data.getData('email')}
                accountType={this.state.data.getData('accountType')}
                billingStreetAddress={this.state.data.getData('billingStreetAddress')}
                billingPostcodeID={this.state.data.getData('billingPostcodeID')}
                billingCountryID={this.state.data.getData('billingCountryID')}
                DOB={this.state.data.getData('DOB')}
                onSave={this.onSave}
            />
        )
    }
}