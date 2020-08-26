import React, {Component} from "react"
import {
    confirmBooking,
    applyBooking,
    getHomeOwnerDetails,
    getHouseData,
    getFinancialData,
    getApplicantData
} from "components/apply/services"
import {House, Image, CancellationPolicy, HomeOwnerInfo, Application, FinancialInfo} from "components/apply/models"
import HouseDetailPageComponent from "./HouseDetailPageComponent"
import {APIModelListAdapter, PostalLocation} from "core/utils/ModelHelper"
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary"
import {alertUser} from "core/alert/Alert"

export const SecretContext = React.createContext(undefined)

export default class HouseDetailPage extends Component {
    /**
     * Loading is tracked only for house information.
     * @param props - contains routerProps
     */
    constructor(props) {
        super(props)
        this.state = {
            homeOwnerInfo: new HomeOwnerInfo({}, "empty"),
            application: new Application({}, "empty"),
            finInfo: new FinancialInfo({}, "empty"),
            clientSecret: undefined,
            applicationUUID: undefined,
            disableDisplay: false,
            inSyncFinInfo: false,
        }
        if (this.props.pageContext) {
            this.houseUUID = this.props.pageContext.house.uuid
            this.state = {
                ...this.state,
                status: "done",
                house: new House(this.props.pageContext.house),
                images: new APIModelListAdapter(this.props.pageContext.house.images, Image, "uuid", "saved"),
                cancellationPolicy: new CancellationPolicy(this.props.pageContext.house.cancellation_policy),
                location: new PostalLocation(this.props.pageContext.house.location),
            }
        } else {
            this.houseUUID = props.houseUUID
            this.state = {
                ...this.state,
                status: "loading",
                house: new House({}, "empty"),
                images: new APIModelListAdapter([], Image, "uuid", "empty"),
                cancellationPolicy: new CancellationPolicy({}, "empty"),
                location: new PostalLocation({}, "empty"),
            }
        }
        this.checkoutFormChild = React.createRef()
        this.confirmModalChild = React.createRef()
    }

    componentDidMount() {
        if (!this.props.pageContext) {
            getHouseData(this.houseUUID)
                .then(result => {
                    this.setState(prevState => ({
                        ...prevState,
                        status: "done",
                        house: new House(result),
                        images: new APIModelListAdapter(result["images"], Image, "uuid", "saved"),
                        cancellationPolicy: new CancellationPolicy(result["cancellation_policy"], "saved"),
                        location: new PostalLocation(result["location"], "saved"),
                    }))
                })
                .catch(error => {
                    this.setState(prevState => ({
                        ...prevState,
                        status: "error",
                    }))
                })
        } else {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
            }))
        }
        getHomeOwnerDetails(this.houseUUID)
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    homeOwnerInfo: new HomeOwnerInfo(result, "saved"),
                }))
            })
            .catch(error => {
                this.setState(prevState => ({
                    ...prevState,
                    status: "error",
                }))
            })

        getApplicantData().then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                application: prevState.application.bulkUpdate(result, "DB", "applicant"),
            }));
        });
    }

    updateFinInfo = () => {
        if (
            this.state.application.getData("bookingInfo.bookingStartDate") &&
            this.state.application.getData("bookingInfo.bookingEndDate") &&
            this.state.application.getData("bookingInfo.numGuests")
        ) {
            this.setState({inSyncFinInfo: true})
            getFinancialData(this.houseUUID, this.state.application.getData("bookingInfo"))
                .then(result => {
                    this.setState(prevState => ({
                        ...prevState,
                        inSyncFinInfo: false,
                        finInfo: new FinancialInfo(result, "saved"),
                    }))
                })
                .catch(error => {
                    if (error.badRequest) {
                        let errorData = error.error.response.data
                        errorData.errors.forEach(error => {
                            alertUser.init({
                                message: error,
                                alertType: "danger",
                                autoHide: false,
                            })
                        })
                    }
                })
        }
    }

    handleDateChange = (startDate, endDate) => {
        this.setState(
            prevState => ({
                ...prevState,
                application: prevState.application.bulkUpdate(
                    {
                        bookingStartDate: startDate,
                        bookingEndDate: endDate,
                    },
                    "int",
                    "bookingInfo"
                ),
            }),
            this.updateFinInfo
        )
    }

    handleGuestsNumChange = value => {
        this.setState(
            prevState => ({
                ...prevState,
                application: prevState.application.setData("bookingInfo.numGuests", value),
            }),
            this.updateFinInfo
        )
    }

    handleApplicationChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            application: prevState.application.setData(field, value),
        }))
    }

    setApplicationUUID = value => {
        this.setState({applicationUUID: value})
    }

    setClientSecret = value => {
        this.setState({clientSecret: value})
    }

    submitApplication = () => {
        console.log("HERE", this.state.application)
        let that = this
        return new Promise(function (resolve, reject) {
            applyBooking(that.houseUUID, that.state.application)
                .then(result => {
                    that.setApplicationUUID(result.data["uuid"])
                    resolve(result)
                })
                .catch(error => {
                    console.log(error)
                    if (error.badRequest) {
                        let errorData = error.error.response.data
                        if (errorData.code === "AA") {
                            alertUser.init({
                                message: "Please fill in all the details to make a booking.",
                                alertType: "warning",
                                autoHide: true,
                            })
                            that.setState(prevState => ({
                                ...prevState,
                                application: prevState.application.parseError(errorData.errors),
                            }))
                        } else if (errorData.code === "AB") {
                            errorData.errors.forEach(error => {
                                alertUser.init({
                                    message: error,
                                    alertType: "danger",
                                    autoHide: false,
                                })
                            })
                        }
                    }
                    reject(error)
                })
        })
    }

    onConfirmBooking = () => {
        let that = this
        this.disableDisplay()
        return new Promise(function (resolve, reject) {
            confirmBooking(that.houseUUID, that.state.applicationUUID)
                .then(result => {
                    that.setClientSecret(result.data.PG.client_secret)
                    return that.checkoutFormChild.current.submit()
                })
                .then(result => {
                    if (result.error) {
                        that.enableDisplay()
                        that.confirmModalChild.current.closeModal()
                        alertUser.init({
                            message: result.error.message,
                            alertType: "danger",
                            autoHide: false,
                        })
                        reject(result.error)
                    } else {
                        if (result.paymentIntent.status === "succeeded") {
                            //Redirect to success page
                            resolve()
                        }
                    }
                })
                .catch(error => {
                    that.enableDisplay()
                    reject(error)
                })
        })
    }

    disableDisplay = () => {
        this.setState({disableDisplay: true})
    }

    enableDisplay = () => {
        this.setState({disableDisplay: false})
    }

    render() {
        return (
            <RequestErrorBoundary status={this.state.status}>
                <SecretContext.Provider value={this.state.clientSecret}>
                    <HouseDetailPageComponent
                        handleDateChange={this.handleDateChange}
                        application={this.state.application}
                        handleApplicationChange={this.handleApplicationChange}
                        handleGuestsNumChange={this.handleGuestsNumChange}
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
                        finInfo={this.state.finInfo}
                        inSyncFinInfo={this.state.inSyncFinInfo}
                    />
                </SecretContext.Provider>
            </RequestErrorBoundary>
        )
    }
}
