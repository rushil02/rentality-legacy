import React, {Component} from "react";
import BillingInfoContainer from "./BillingInfoContainer";
import {checkHousePayoutInfo} from "houseListing/services";
import {ResponseLoadingSpinner} from "core/loadingSpinners/LoadingSpinner";
import PGInfoContainer from "./PGInfoContainer";
import BankDetailsContainer from "./BankDetailsContainer";

/**
 *     IMPORTANT: Do NOT use Cache here
 */

export default class PayoutInfoContainer extends Component {
    formID = 12;

    constructor(props) {
        super(props);
        this.state = {
            verifying: true,
            statusBI: "Verifying",
            statusPI: "Verifying",
            statusII: "Verifying"
        };
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, "initial", "Billing and Bank Information");
        this.verifyPayoutInfo();
    }

    componentWillUnmount() {
        this.props.navContext.data.unloadForm();
    }

    verifyPayoutInfo = () => {
        checkHousePayoutInfo(this.props.houseUUID)
            .then((result) => {
                this.setState((prevState) => ({
                    ...prevState,
                    verifying: false,
                    statusBI: "Complete"
                }));
            })
            .catch((error) => {
                if (error.response.status === 406 && error.response.data.code === "BIM") {
                    this.setState((prevState) => ({
                        ...prevState,
                        verifying: false,
                        statusBI: "Incomplete"
                    }));
                } else if (error.response.status === 406 && error.response.data.code === "PGM") {
                    this.setState((prevState) => ({
                        ...prevState,
                        verifying: false,
                        statusBI: "Complete",
                        statusPI: "Incomplete"
                    }));
                } else if (error.response.status === 406 && error.response.data.code === "IIM") {
                    this.setState((prevState) => ({
                        ...prevState,
                        verifying: false,
                        statusBI: "Complete",
                        statusPI: "Complete",
                        statusII: "Incomplete"
                    }));
                }
            });

        // this.props.navContext.sync();
    };

    onSave = () => {
        return new Promise(function(resolve, reject) {
            resolve();
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.verifying ? (
                    <ResponseLoadingSpinner height={"20vh"} message={"Verifying your Billing details"} />
                ) : null}
                <div className="col-md-12" style={{marginTop: "50px"}}>
                    <BillingInfoContainer status={this.state.statusBI} verifyPayoutInfo={this.verifyPayoutInfo} />
                    <PGInfoContainer
                        statusBI={this.state.statusBI}
                        statusPI={this.state.statusPI}
                        statusII={this.state.statusII}
                        houseUUID={this.props.houseUUID}
                    />
                    <BankDetailsContainer
                        statusBI={this.state.statusBI}
                        statusPI={this.state.statusPI}
                        statusII={this.state.statusII}
                    />
                </div>
            </React.Fragment>
        );
    }
}
