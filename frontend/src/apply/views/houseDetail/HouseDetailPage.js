import React, {Component} from "react";
import {confirmBooking, applyBooking, getApplicantData, getHomeOwnerDetails, getHouseData} from "apply/services";
import {House, Image, CancellationPolicy, HomeOwnerInfo, Application, Applicant} from "apply/models";
import HouseDetailPageComponent from "./HouseDetailPageComponent";
import {APIModelListAdapter, PostalLocation} from "core/utils/ModelHelper";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";
import {alertUser} from "core/alert/Alert";

export const SecretContext = React.createContext(undefined);

export default class HouseDetailPage extends Component {
    /**
     * Loading is tracked only for house information.
     * @param props - contains routerProps
     */
    constructor(props) {
        super(props);
        this.houseUUID = props.routerProps.match.params.houseUUID;
        this.state = {
            status: "loading",
            house: new House({}, "empty"),
            images: new APIModelListAdapter([], Image, "uuid", "empty"),
            cancellationPolicy: new CancellationPolicy({}, "empty"),
            location: new PostalLocation({}, "empty"),
            homeOwnerInfo: new HomeOwnerInfo({}, "empty"),
            application: new Application({}, "empty"),
            clientSecret: undefined,
            applicationUUID: undefined,
            disableDisplay: false
        };
        this.checkoutFormChild = React.createRef();
        this.confirmModalChild = React.createRef();
    }

    componentDidMount() {
        this.setState(prevState => ({status: "loading"}));
        getHouseData(this.houseUUID)
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    status: "done",
                    house: new House(result),
                    images: new APIModelListAdapter(result["images"], Image, "uuid", "saved"),
                    cancellationPolicy: new CancellationPolicy(result["cancellation_policy"], "saved"),
                    location: new PostalLocation(result["location"], "saved")
                }));
            })
            .catch(error => {
                this.setState(prevState => ({
                    ...prevState,
                    status: "error"
                }));
            });

        getHomeOwnerDetails(this.houseUUID)
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    homeOwnerInfo: new HomeOwnerInfo(result, "saved")
                }));
            })
            .catch(error => {
                this.setState(prevState => ({
                    ...prevState,
                    status: "error"
                }));
            });

        getApplicantData().then(result => {
            this.setState(prevState => ({
                ...prevState,
                application: prevState.application.bulkUpdate(result, "DB", "applicant")
            }));
        });
    }

    handleDateChange = (startDate, endDate) => {
        this.setState(prevState => ({
            ...prevState,
            application: prevState.application.bulkUpdate(
                {
                    bookingStartDate: startDate,
                    bookingEndDate: endDate
                },
                "int",
                "bookingInfo"
            )
        }));
    };

    handleApplicationChange = (field, value, parent) => {
        this.setState(prevState => ({
            ...prevState,
            application: prevState.application.setData(field, value, parent)
        }));
    };

    setApplicationUUID = value => {
        this.setState({applicationUUID: value});
    };

    setclientSecret = value => {
        this.setState({clientSecret: value});
    };

    submitApplication = () => {
        let that = this;
        return new Promise(function (resolve, reject) {
            applyBooking(that.houseUUID, that.state.application)
                .then(result => {
                    that.setApplicationUUID(result.data["application_uuid"]);
                    resolve(result);
                })
                .catch(error => {
                    if (error.badRequest) {
                        let errorData = error.error.response.data;
                        if (errorData.code === "AA") {
                            alertUser.init({
                                message: "Please fill in all the details to make a booking.",
                                alertType: "warning",
                                autoHide: true
                            });
                            that.setState(prevState => ({
                                ...prevState,
                                application: prevState.application.parseError(errorData.errors)
                            }));
                        } else if (errorData.code === "AB") {
                            errorData.errors.forEach(error => {
                                alertUser.init({
                                    message: error,
                                    alertType: "danger",
                                    autoHide: false
                                });
                            });
                        }
                    }
                    reject(error);
                });
        });
    };

    onConfirmBooking = () => {
        let that = this;
        this.disableDisplay();
        return new Promise(function (resolve, reject) {
            confirmBooking(that.houseUUID, that.state.applicationUUID)
                .then(result => {
                    that.setclientSecret(result.data["client_secret"]);
                    console.log(that.state.clientSecret, result);
                    return that.checkoutFormChild.current.submit();
                })
                .then(result => {
                    console.log(result);
                    if (result.error) {
                        that.enableDisplay();
                        that.confirmModalChild.current.closeModal();
                        alertUser.init({
                            message: result.error.message,
                            alertType: "danger",
                            autoHide: false
                        });
                        reject(result.error);
                        console.log(result.error.message);
                    } else {
                        if (result.paymentIntent.status === "succeeded") {
                            //Redirect to success page
                            console.log("Hurray");
                            resolve();
                        }
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    disableDisplay = () => {
        this.setState({disableDisplay: true});
    };

    enableDisplay = () => {
        this.setState({disableDisplay: false});
    };

    render() {
        return (
            <RequestErrorBoundary status={this.state.status}>
                <SecretContext.Provider value={this.state.clientSecret}>
                    <HouseDetailPageComponent
                        handleDateChange={this.handleDateChange}
                        application={this.state.application}
                        handleApplicationChange={this.handleApplicationChange}
                        house={this.state.house}
                        images={this.state.images}
                        cancellationPolicy={this.state.cancellationPolicy}
                        location={this.state.location}
                        homeOwnerInfo={this.state.homeOwnerInfo}
                        onApply={this.submitApplication}
                        onConfirmBooking={this.onConfirmBooking}
                        checkoutFormRef={this.checkoutFormChild}
                        confirmModalRef={this.confirmModalChild}
                        applicationUUID={this.state.applicationUUID}
                        disableDisplay={this.state.disableDisplay}
                    />
                </SecretContext.Provider>
            </RequestErrorBoundary>
        );
    }
}
