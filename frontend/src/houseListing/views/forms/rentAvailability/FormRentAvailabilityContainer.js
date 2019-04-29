import React, {Component} from 'react';
import FormRentAvailabilityComponent from "./FormRentAvailabilityComponent";

export default class FormRentAvailabilityContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainData: props.mainDataCache.data,
            errors:{}
        }
    }


    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            mainData: prevState["mainData"].setData(field, value)
        }))
    };


    render() {
        return (
            <FormRentAvailabilityComponent
                onFieldChange={this.onFieldChange}
                rent={this.state.mainData.getData('rent')}
                minStay={this.state.mainData.getData('minStay')}
                maxStay={this.state.mainData.getData('maxStay')}
                maxPeopleAllowed={this.state.mainData.getData('maxPeopleAllowed')}
                errors={this.state.errors}
            />
        )
    }
}