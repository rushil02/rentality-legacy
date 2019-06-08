import React, {Component} from 'react';
import {House} from "../../../models";
import {getHouseData} from "../../../services";


export default class InfoForTenantsContainer extends Component {
    formID = 7

    constructor(props) {
        super(props);
        if (props.cache.data === undefined) {
            this.state = {
                data: new House({}, 'empty'),
            };
        } else {
            this.state = {
                data: props.cache.data,
            };
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Rent & Availability");

        if (this.state.data.status === 'empty') {
            // Fetch house details
            getHouseData(this.props.houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            data: result,
                        })
                    );
                    this.props.navContext.data.updateFormState(this.formID, 'saved');
                });
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.data.status);
        }
        this.props.navContext.sync();
    };
}