import React, {Component} from "react"
import BillingInfoContainer from "./BillingInfoContainer"
import {checkHousePayoutInfo} from "components/houseListing/services"
import {ResponseLoadingSpinner} from "core/UIComponents/loadingSpinners/LoadingSpinner"
import PGInfoContainer from "./PGInfoContainer"
import BankDetailsContainer from "./BankDetailsContainer"
import {loadStripe} from "@stripe/stripe-js"
import {Elements, ElementsConsumer} from "@stripe/react-stripe-js"
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary"
import {UserPII} from "components/userAccount/models"
import {patchUserProfileData, getUserProfileData} from "components/userAccount/services"
import {getCountryData} from "core/UIComponents/CountryAutoSuggest/services"
import {alertUser} from "core/alert/Alert";

/**
 *     IMPORTANT: Do NOT use Cache here
 */

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

function getLoadStatus(stripe) {
    if (!stripe) {
        return "loading"
    } else {
        return "done"
    }
}

export default class PayoutInfoContainer extends Component {
    formID = 12

    constructor(props) {
        super(props)
        this.state = {
            userInfo: new UserPII({}, "empty"),
            showSelectCountry: false,
            addBusinessNameField: false,
            billingCountryName: undefined,
            verifying: true,
            statusBI: "Verifying",
            statusPI: "Verifying",
            statusII: "Verifying",
            statusEA: "Verifying",
            PG: null,
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, "initial", "Billing and Bank Information")
        this.props.navContext.sync()
        this.verifyPayoutInfo()
    }

    componentWillUnmount() {
        this.props.navContext.data.unloadForm()
    }

    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            userInfo: prevState.userInfo.setData(field, value),
        }))
    }

    getUserProfile = () => {
        getUserProfileData().then(result => {
            let billingCountryID = result.getData("billingCountryID")
            let accountType = result.getData("accountType")
            console.log(billingCountryID)
            if (billingCountryID === "" || billingCountryID === null || billingCountryID === undefined) {
                this.setState(prevState => ({
                    ...prevState,
                    showSelectCountry: true,
                    userInfo: result,
                }))
            } else {
                if (accountType === "Business") {
                    this.setState(prevState => ({
                        ...prevState,
                        addBusinessNameField: true,
                        userInfo: result,
                    }))
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        userInfo: result,
                    }))
                }
                this.getCountryName(billingCountryID)
            }
        })
    }

    getCountryName = billingCountryID => {
        getCountryData(billingCountryID)
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    billingCountryName: result.name,
                }))
            })
            .catch(error => alertUser.init({stockAlertType: "connectionError"}))
    }

    onBillingInfoSave = () => {
        const that = this
        return new Promise(function (resolve, reject) {
            patchUserProfileData(that.state.userInfo)
                .then(result => {
                    that.setState(prevState => ({
                        ...prevState,
                        userInfo: result,
                    }))
                    that.verifyPayoutInfo()
                    resolve(result)
                })
                .catch(error => {
                    that.forceUpdate()
                    reject(error)
                })
        })
    }

    verifyPayoutInfo = () => {
        checkHousePayoutInfo(this.props.houseUUID)
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    verifying: false,
                    statusBI: "Complete",
                    statusPI: "Complete",
                    statusII: "Complete",
                    statusEA: "Complete",
                    PG: result.data["payment_gateway"],
                }))
                this.props.navContext.data.updateFormState(this.formID, "hasChanged")
                this.props.navContext.sync()
            })
            .catch(error => {
                if (error.response.status === 406 && error.response.data.code === "BIM") {
                    this.setState(prevState => ({
                        ...prevState,
                        verifying: false,
                        statusBI: "Incomplete",
                        statusPI: "Incomplete",
                        statusII: "Incomplete",
                        statusEA: "Incomplete",
                    }))
                } else if (error.response.status === 406 && error.response.data.code === "PGM") {
                    this.setState(prevState => ({
                        ...prevState,
                        verifying: false,
                        statusBI: "Complete",
                        statusPI: "Incomplete",
                        statusII: "Incomplete",
                        statusEA: "Incomplete",
                        PG: error.response.data["payment_gateway"],
                    }))
                } else if (error.response.status === 406 && error.response.data.code === "IIM") {
                    this.setState(prevState => ({
                        ...prevState,
                        verifying: false,
                        statusBI: "Complete",
                        statusPI: "Complete",
                        statusII: "Incomplete",
                        statusEA: "Incomplete",
                        PG: error.response.data["payment_gateway"],
                    }))
                } else if (error.response.status === 406 && error.response.data.code === "EAM") {
                    this.setState(prevState => ({
                        ...prevState,
                        verifying: false,
                        statusBI: "Complete",
                        statusPI: "Complete",
                        statusII: "Complete",
                        statusEA: "Incomplete",
                        PG: error.response.data["payment_gateway"],
                    }))
                }
            })
    }

    onSave = () => {
        return new Promise(function (resolve, reject) {
            resolve()
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.verifying ? (
                        <ResponseLoadingSpinner height={"20vh"} message={"Verifying your Billing details"}/>
                    ) :
                    <div className="col-md-12" style={{marginTop: "50px"}}>
                        <BillingInfoContainer
                            status={this.state.statusBI}
                            userInfo={this.state.userInfo}
                            showSelectCountry={this.state.showSelectCountry}
                            addBusinessNameField={this.state.addBusinessNameField}
                            billingCountryName={this.state.billingCountryName}
                            verifyPayoutInfo={this.verifyPayoutInfo}
                            getUserProfile={this.getUserProfile}
                            onFieldChange={this.onFieldChange}
                            onSave={this.onBillingInfoSave}
                            verifying={this.state.verifying}
                        />
                        <PGInfoContainer
                            statusBI={this.state.statusBI}
                            statusPI={this.state.statusPI}
                            statusII={this.state.statusII}
                            houseUUID={this.props.houseUUID}
                            verifyPayoutInfo={this.verifyPayoutInfo}
                            verifying={this.state.verifying}
                            PG={this.state.PG}
                        />
                        <Elements stripe={stripePromise}>
                            <ElementsConsumer>
                                {({stripe}) => {
                                    return (
                                        <RequestErrorBoundary status={getLoadStatus(stripe)}>
                                            <BankDetailsContainer
                                                statusBI={this.state.statusBI}
                                                statusPI={this.state.statusPI}
                                                statusII={this.state.statusII}
                                                statusEA={this.state.statusEA}
                                                stripe={stripe}
                                                userInfo={this.state.userInfo}
                                                verifyPayoutInfo={this.verifyPayoutInfo}
                                                verifying={this.state.verifying}
                                                PG={this.state.PG}
                                            />
                                        </RequestErrorBoundary>
                                    )
                                }}
                            </ElementsConsumer>
                        </Elements>
                    </div>
                }
            </React.Fragment>
        )
    }
}
