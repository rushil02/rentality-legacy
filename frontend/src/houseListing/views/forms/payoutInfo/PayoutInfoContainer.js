import React, {Component} from 'react';
import {UserPII} from "userAccount/models";
import PayoutInfoComponent from "./PayoutInfoComponent";
import {getUserProfileData} from "userAccount/services";

/**
 *     IMPORTANT: Do NOT use Cache here
 */

export default class PayoutInfoContainer extends Component {
    formID = 12;

    constructor(props) {
        super(props);
        this.state = {
            data: new UserPII({}, 'empty'),
        };
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Rent & Availability");

        if (this.state.data.status === 'empty') {
            // Fetch house details
            getUserProfileData()
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            data: result,
                        })
                    );
                    this.props.navContext.data.updateFormState(this.formID, 'saved');
                    this.props.navContext.sync();

                });
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.data.status);
        }
        this.props.navContext.sync();
    };

    componentWillUnmount() {
        this.props.navContext.data.unloadForm();
    };

    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            data: prevState.data.setData(field, value)
        }));
        this.props.navContext.data.updateCurrentFormState('hasChanged');
        this.props.navContext.sync();
    };

    onSave = () => {
        return new Promise(function (resolve, reject) {
            resolve()

        })
    };

    render() {
        return (
            <PayoutInfoComponent
                onFieldChange={this.onFieldChange}
                errors={this.state.data.errors}
                email={this.state.data.getData('email')}
                sex={this.state.data.getData('sex')}
                billingCountry={this.state.data.getData('billingCountry')}
                lastName={this.state.data.getData('lastName')}
                DOB={this.state.data.getData('DOB')}
                billingPostcode={this.state.data.getData('billingPostcode')}
                accountType={this.state.data.getData('accountType')}
                contactNum={this.state.data.getData('contactNum')}
                billingStreetAddress={this.state.data.getData('billingStreetAddress')}
            />
        )
    }
}