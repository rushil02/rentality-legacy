import React, {Component} from "react";
import AlertListComponent from "./components/AlertList";
import {getSystemMessages} from "./services";

export let alertUser = {};

const availableAlertTypes = ["primary", "secondary", "success", "danger", "info", "warning", "dark", "light"];

const stockAlertList = {
    connectionError: {
        message: "Oops! Looks like we are having connection problems. Please check your Internet Connection",
        alertType: "danger",
        autoHide: true,
    },
    unknownError: {
        message: "Something went wrong. Please contact us for support.",
        alertType: "danger",
        autoHide: true,
    },
    generic: {
        message: "Oops! Looks like we ran into some problem. Please refresh the page and try again, or contact us.",
        alertType: "danger",
        autoHide: false,
    },
    "save-success": {
        message: "Information saved!",
        alertType: "success",
        autoHide: true,
    },
};

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertList: [],
        };
    }

    componentDidMount() {
        alertUser.init = ({stockAlertType, message, alertType, autoHide}) => {
            if (stockAlertType) {
                this.setState((prevState) => ({
                    alertList: [...prevState.alertList, stockAlertList[stockAlertType]],
                }));
            } else {
                if (availableAlertTypes.indexOf(alertType) === -1) {
                    console.error("Invalid alertType : " + alertType);
                } else {
                    this.setState((prevState) => ({
                        alertList: [
                            ...prevState.alertList,
                            {
                                message: message,
                                alertType: alertType,
                                autoHide: autoHide,
                            },
                        ],
                    }));
                }
            }
        };
        getSystemMessages().then((data) => {
            let sysAlerts = [];
            data.map((item, index) => {
                let alertType = item.level_tag.replace(/^(alert-)/, "");
                if (availableAlertTypes.indexOf(alertType) === -1) {
                    console.error("Invalid alertType : " + alertType);
                } else {
                    sysAlerts.push({message: item.message, alertType: alertType, autoHide: true});
                }
            });

            this.setState((prevState) => ({
                alertList: [...prevState.alertList, ...sysAlerts],
            }));
        });
    }

    render() {
        return (
            <React.Fragment>
                <AlertListComponent alertList={this.state.alertList} />
            </React.Fragment>
        );
    }
}
