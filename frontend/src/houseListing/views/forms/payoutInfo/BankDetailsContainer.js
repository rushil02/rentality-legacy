import React, {Component} from "react";
import {alertUser} from "core/alert/Alert";
import Select from "react-select";
import FileInputComponent from "core/UIComponents/FileInput/FileInputComponent";
import {PulseLoader} from "react-spinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faPen, faPlus} from "@fortawesome/free-solid-svg-icons";
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton";
import {getAddUpdateBankAccount, postAddUpdateBankAccount} from "houseListing/services";
import styles from "./PayoutInfoContainer.css";

export default class BankDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modeEditing: false,
            showEditButton: false,
            routingNumber: "",
            accountNumber: "",
        };
    }

    componentDidMount() {
        //hit addUpdatebankaccount, if yes show edit button, if no show save button
        if (this.props.statusEA === "Incomplete") {
            getAddUpdateBankAccount(this.props.PG)
                .then((result) => {
                    if (!result.pg.error) {
                        this.setState((prevState) => ({
                            ...prevState,
                            showEditButton: true,
                            routingNumber: result.pg.routing_number,
                            accountNumber: "XXXXX" + result.pg.last4,
                        }));
                    }
                })
                .catch((error) => {
                    let errorData = error.response.data.details;
                    alertUser.init({
                        message: errorData,
                        alertType: "danger",
                        autoHide: false,
                    });
                });
        }
    }

    onEdit = () => {
        this.setState({showEditButton: false, routingNumber: "", accountNumber: ""});
    };

    onFieldChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    getBadge = () => {
        if (this.props.statusBI === "Incomplete") {
            return (
                <span className="badge badge-danger" style={{marginLeft: "20px"}}>
                    Please Complete Billing Information
                </span>
            );
        } else if (this.props.statusPI === "Incomplete" || this.props.statusII === "Incomplete") {
            return (
                <span className="badge badge-danger" style={{marginLeft: "20px"}}>
                    Please Complete Payment Information
                </span>
            );
        } else if (this.props.statusEA === "Incomplete") {
            return (
                <span className="badge badge-danger" style={{marginLeft: "20px"}}>
                    Required
                </span>
            );
        } else if (this.props.statusEA === "Complete") {
            return (
                <span className="badge badge-success" style={{marginLeft: "20px"}}>
                    Complete
                </span>
            );
        } else {
            return null;
        }
    };

    toggleEditState = (val) => {
        if (val === null || val === undefined) {
            this.setState((prevState) => ({modeEditing: !prevState.modeEditing}));
        } else {
            this.setState({modeEditing: val});
        }
    };

    getEditButton = () => {
        let buttonConfig = {};
        if (this.props.verifying) {
            buttonConfig = {
                title: "Please Wait",
                action: (e) => {
                    e.stopPropagation();
                },
                icon: faPlus,
            };
        } else if (this.state.modeEditing) {
            buttonConfig = {
                title: "Collapse",
                action: (e) => {
                    e.stopPropagation();
                    this.toggleEditState(false);
                },
                icon: faChevronUp,
            };
        } else {
            buttonConfig = {
                title: "Edit",
                action: (e) => {
                    e.stopPropagation();
                    this.toggleEditState(true);
                },
                icon: faPen,
            };
        }

        if (
            this.props.statusBI === "Incomplete" ||
            this.props.statusPI === "Incomplete" ||
            this.props.statusII === "Incomplete"
        ) {
            return (
                <button
                    className={"btn btn-primary btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                    type="button"
                    title={buttonConfig.title}
                    onClick={buttonConfig.action}
                    aria-controls={"collapsibleCalendar-"}
                    disabled
                >
                    <FontAwesomeIcon icon={buttonConfig.icon} />
                </button>
            );
        } else {
            return (
                <button
                    className={"btn btn-primary btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                    type="button"
                    title={buttonConfig.title}
                    onClick={buttonConfig.action}
                    aria-controls={"collapsibleCalendar-"}
                >
                    <FontAwesomeIcon icon={buttonConfig.icon} />
                </button>
            );
        }
    };

    onSave = () => {
        // FIXME: move to dynamic fields APIModel
        let accountType =
            this.props.userInfo.getData("accountType") === "Business"
                ? "company"
                : this.props.userInfo.getData("accountType");
        let accountHolderName =
            this.props.userInfo.getData("firstName") + " " + this.props.userInfo.getData("lastName");
        let routingNumber = this.state.routingNumber;
        let accountNumber = this.state.accountNumber;

        let that = this;
        return new Promise(function (resolve, reject) {
            that.props.stripe
                .createToken("bank_account", {
                    country: "AU",
                    currency: "aud",
                    routing_number: routingNumber,
                    account_number: accountNumber,
                    account_holder_name: accountHolderName,
                    account_holder_type: accountType,
                })
                .then((result) => {
                    if (result.error) {
                        alertUser.init({
                            message: result.error.message,
                            alertType: "danger",
                            autoHide: false,
                        });
                        reject(result.error);
                    } else if (result.token) {
                        that.submitToken(result.token.id);
                        resolve();
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    submitToken = (tokenID) => {
        // FIXME
        postAddUpdateBankAccount(this.props.PG, {token: tokenID})
            .then((result) => {
                if (result.pg.error) {
                    alertUser.init({
                        message: result.pg.error,
                        alertType: "danger",
                        autoHide: false,
                    });
                } else {
                    this.setState((prevState) => ({
                        ...prevState,
                        showEditButton: true,
                        accountNumber: "XXXXX" + result.pg.last4,
                    }));
                    this.props.verifyPayoutInfo();
                }
            })
            .catch((error) => {
                let errorData = error.response.data.details;
                alertUser.init({
                    message: errorData,
                    alertType: "danger",
                    autoHide: false,
                });
            });
    };

    render() {
        if (this.state.modeEditing) {
            $("#collapsibleBankDetails").collapse("show");
        } else {
            $("#collapsibleBankDetails").collapse("hide");
        }
        return (
            <React.Fragment>
                <div className={"card mb-3 " + styles.accordionBorder}>
                    <div className={"card-body " + styles.cardBody}>
                        <div className={styles.cardTextContent}>
                            <span>
                                <b>Step 3: Bank Details</b>
                            </span>
                            {this.getBadge()}
                        </div>
                        <div className="loading-container">
                            <PulseLoader
                                // css={override}
                                sizeUnit={"px"}
                                size={10}
                                color={"#3fc692"}
                                loading={false}
                            />
                        </div>

                        <div className={styles.cardButtonGroup}>{this.getEditButton()}</div>
                    </div>
                    <div className={"collapse " + styles.cardContainer} id={"collapsibleBankDetails"}>
                        <div
                            className={"col-11 " + styles.cardContainer}
                            style={{borderTop: "1px solid #e9ebf0", padding: "40px"}}
                        >
                            <div className={"col-10"}>
                                <div className={"row"}>
                                    <div className="col-12">
                                        <div className="input no-background">
                                            {this.state.showEditButton ? (
                                                <input
                                                    type="text"
                                                    className={
                                                        "inp-routing-number form-control " + styles.disabledInput
                                                    }
                                                    name="routing_number"
                                                    placeholder="BSB"
                                                    onChange={(e) =>
                                                        this.onFieldChange("routingNumber", e.target.value)
                                                    }
                                                    value={this.state.routingNumber}
                                                    disabled
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="inp-routing-number form-control"
                                                    name="routing_number"
                                                    placeholder="BSB"
                                                    onChange={(e) =>
                                                        this.onFieldChange("routingNumber", e.target.value)
                                                    }
                                                    value={this.state.routingNumber}
                                                />
                                            )}
                                        </div>
                                        <div id="bank-error-message" className="invalid-feedback" />
                                    </div>
                                    <div className="col-12">
                                        <div className="input no-background">
                                            {this.state.showEditButton ? (
                                                <input
                                                    type="text"
                                                    className={
                                                        "inp-account-number form-control " + styles.disabledInput
                                                    }
                                                    name="account_number"
                                                    placeholder="Account Number"
                                                    onChange={(e) =>
                                                        this.onFieldChange("accountNumber", e.target.value)
                                                    }
                                                    value={this.state.accountNumber}
                                                    disabled
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="inp-account-number form-control"
                                                    name="account_number"
                                                    placeholder="Account Number"
                                                    onChange={(e) =>
                                                        this.onFieldChange("accountNumber", e.target.value)
                                                    }
                                                    value={this.state.accountNumber}
                                                />
                                            )}
                                        </div>
                                        <div id="bank-warning-message" className="invalid-feedback" />
                                    </div>
                                    <div className={"col-12"} style={{marginTop: "35px", marginBottom: "30px"}}>
                                        {this.state.showEditButton ? (
                                            <a
                                                type="button"
                                                className="btn float-right imp-button-style"
                                                onClick={this.onEdit}
                                                tabIndex={"0"}
                                            >
                                                Edit
                                            </a>
                                        ) : (
                                            <APIRequestButton
                                                layoutClasses={"btn float-right imp-button-style"}
                                                cTextOptions={{
                                                    default: "Save",
                                                    loading: "Saving",
                                                    done: "Saved",
                                                    error: "Error!",
                                                }}
                                                callback={this.onSave}
                                                containerID={"collapsibleBankDetails"}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
