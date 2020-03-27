import React, {Component} from 'react';
import BillingInfoContainer from "./BillingInfoContainer";
import {checkHousePayoutInfo} from "houseListing/services";
import {ResponseLoadingSpinner} from "core/loadingSpinners/LoadingSpinner";
import PGInfoContainer from "./PGInfoContainer";

/**
 *     IMPORTANT: Do NOT use Cache here
 */

export default class PayoutInfoContainer extends Component {
    formID = 12;

    constructor(props) {
        super(props);
        this.state = {
            verifying: true,
            statusBI: 'Verifying'
        };
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Billing and Bank Information");

        checkHousePayoutInfo(this.props.houseUUID)
            .then(result => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        verifying: false,
                        statusBI: 'Complete'
                    })
                );

            }).catch(error => {
            if (error.response.status === 406 && error.response.data.code === "BIM") {
                this.setState(prevState => (
                    {
                        ...prevState,
                        verifying: false,
                        statusBI: 'Incomplete'
                    })
                );
            }
        });

        // this.props.navContext.sync();
    };

    componentWillUnmount() {
        this.props.navContext.data.unloadForm();
    };

    onSave = () => {
        return new Promise(function (resolve, reject) {
            resolve()

        })
    };

    render() {
        return (
            <React.Fragment>
                {this.state.verifying ?
                    <ResponseLoadingSpinner height={"20vh"} message={"Verifying your Billing details"}/> : null
                }
                <div className="col-md-12" style={{marginTop: "50px"}}>
                    <BillingInfoContainer
                        status={this.state.statusBI}
                    />
                    <PGInfoContainer
                        statusBI={this.state.statusBI}
                    />
                </div>
            </React.Fragment>
        )
    }

}