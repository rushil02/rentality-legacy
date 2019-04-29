import React, {Component} from 'react';
import FormPrimaryComponent from "./FormPrimaryComponent";
import {getFormOptions, getHouseData, getMockData} from "houseListing/services";
import {Navigator} from "houseListing/models";


export default class FormPrimaryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.cache.data
        }
    }

    componentDidMount(){
        if (this.state.mode === 'edit') {
            this._houseUUID = this.props.match.params.houseUUID;

            // Fetch house details
            getHouseData(this._houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            mainData: result
                        })
                    );
                    console.log(this.state.mainData);
                });
        }

        this.props.navContext.update(new Navigator(this.onSave, 1))
    };

    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            data: prevState["data"].setData(field, value)
        }))
    };

    onSave = (e) => {
        console.log("Save called!!!!!!!");
        e.stopPropagation();
        return getFormOptions
    };

    render() {
        return (
            <FormPrimaryComponent
                onFieldChange={this.onFieldChange}
                errors={{}}
                title={this.state.data.getData('title')}
                houseNum={this.state.data.getData('houseNum')}
                streetName={this.state.data.getData('streetName')}
                postalCode={this.state.data.getData('postalCode')}
                homeType={this.state.data.getData('homeType')}
                furnished={this.state.data.getData('furnished')}
                numBedrooms={this.state.data.getData('numBedrooms')}
                numBathrooms={this.state.data.getData('numBathrooms')}
                numParkSpaces={this.state.data.getData('numParkSpaces')}
            />

        )
    }
}