import React, { Component } from "react"
import { alertUser } from "core/alert/Alert"
import { PulseLoader } from "react-spinners"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faPen, faPlus } from "@fortawesome/free-solid-svg-icons"
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton"
import { createPaymentInfo, updatePaymentInfo } from "components/houseListing/services"
import styles from "./PayoutInfoContainer.module.css"
import { Accordion, Card, Button } from "react-bootstrap"

export default class PGInfoContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modeEditing: false,
        }
    }

    getBadge = () => {
        if (this.props.statusBI === "Incomplete") {
            return (
                <span className="badge badge-danger" style={{ marginLeft: "20px" }}>
                    Please Complete Billing Information
                </span>
            )
        } else if (this.props.statusPI === "Incomplete" || this.props.statusII === "Incomplete") {
            return (
                <span className="badge badge-danger" style={{ marginLeft: "20px" }}>
                    Required
                </span>
            )
        } else if (this.props.statusPI === "Complete" && this.props.statusII === "Complete") {
            return (
                <span className="badge badge-success" style={{ marginLeft: "20px" }}>
                    Complete
                </span>
            )
        } else {
            return null
        }
    }

    toggleEditState = val => {
        if (val === null || val === undefined) {
            this.setState(prevState => ({ modeEditing: !prevState.modeEditing }))
        } else {
            this.setState({ modeEditing: val })
        }
    }

    getEditButton = () => {
        let buttonConfig = {}
        if (this.props.verifying) {
            buttonConfig = {
                title: "Please Wait",
                action: e => {
                    e.stopPropagation()
                },
                icon: faPlus,
            }
        } else if (this.state.modeEditing) {
            buttonConfig = {
                title: "Collapse",
                action: e => {
                    e.stopPropagation()
                    this.toggleEditState(false)
                },
                icon: faChevronUp,
            }
        } else {
            buttonConfig = {
                title: "Edit",
                action: e => {
                    e.stopPropagation()
                    this.toggleEditState(true)
                },
                icon: faPen,
            }
        }

        if (this.props.statusBI === "Incomplete") {
            return (
                <Accordion.Toggle
                    as={Button}
                    className={"btn btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                    title={buttonConfig.title}
                    onClick={buttonConfig.action}
                    eventKey={0}
                    disabled
                >
                    <FontAwesomeIcon icon={buttonConfig.icon} />
                </Accordion.Toggle>
            )
        } else {
            return (
                <Accordion.Toggle
                    as={Button}
                    className={"btn btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                    title={buttonConfig.title}
                    onClick={buttonConfig.action}
                    eventKey={0}
                >
                    <FontAwesomeIcon icon={buttonConfig.icon} />
                </Accordion.Toggle>
            )
        }
    }

    redirectToStripe = data => {
        window.location.href = data.url
    }

    onSave = () => {
        const that = this
        let data = { success_url: window.location.pathname.slice(1), failure_url: window.location.pathname.slice(1) }
        if (this.props.statusPI === "Incomplete") {
            return new Promise(function (resolve, reject) {
                createPaymentInfo(that.props.PG, that.props.houseUUID, data)
                    .then(result => {
                        that.redirectToStripe(result.pg.data)
                        resolve(result)
                    })
                    .catch(error => {
                        let errorData = error.response.data.details
                        alertUser.init({
                            message: errorData,
                            alertType: "danger",
                            autoHide: false,
                        })
                        reject(error)
                    })
            })
        } else if (this.props.statusII === "Incomplete" || this.props.statusII === "Complete") {
            return new Promise(function (resolve, reject) {
                updatePaymentInfo(that.props.PG, data)
                    .then(result => {
                        that.redirectToStripe(result.pg.data)
                        resolve(result)
                    })
                    .catch(error => {
                        let errorData = error.response.data.details
                        alertUser.init({
                            message: errorData,
                            alertType: "danger",
                            autoHide: false,
                        })
                        reject(error)
                    })
            })
        } else {
            return new Promise(function (resolve, reject) {
                updatePaymentInfo(that.props.PG, data)
                    .then(result => {
                        that.redirectToStripe(result.pg.data)
                        resolve(result)
                    })
                    .catch(error => {
                        let errorData = error.response.data.details
                        alertUser.init({
                            message: errorData,
                            alertType: "danger",
                            autoHide: false,
                        })
                        reject(error)
                    })
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Accordion>
                    <Card className={"card mb-3 " + styles.accordionBorder}>
                        <Card.Header className={"card-body " + styles.cardHeader}>
                            <div className={styles.cardTextContent}>
                                <span>
                                    <b>Step 2: Payment Information</b>
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
                        </Card.Header>
                        <Accordion.Collapse eventKey={0}>
                            <Card.Body className={styles.cardContainer} id={"collapsiblePaymentInfo"}>
                                <div
                                    className={"col-11 " + styles.cardContainer}
                                    style={{ borderTop: "1px solid #e9ebf0", padding: "40px" }}
                                >
                                    <div className={"col-10"}>
                                        <div className={"row"}>
                                            <div className="col-12">
                                                <div className={styles.stripeInformation}>
                                                    <p className={styles.stripeDetail}>
                                                        We use Stripe to make sure you get paid on time and to keep your
                                                        personal bank and details secure. Click{" "}
                                                        <strong>Add Details</strong> to set up your payments on Stripe.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-7"></div>
                                            <div className="col-5">
                                                <APIRequestButton
                                                    layoutClasses={"btn float-right " + styles.stripeSaveBtn}
                                                    cTextOptions={{
                                                        default: "Add Details",
                                                        loading: " ",
                                                        done: "Redirecting...",
                                                        error: "Error!",
                                                    }}
                                                    callback={this.onSave}
                                                    containerID={"collapsiblePaymentInfo"}
                                                    loaderColor={"#f8bf25"}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <p className={styles.stripeDetail + " " + styles.alignRight}>
                                                    By clicking, you agree to{" "}
                                                    <a className={styles.fadedBlue} href="/pages/tos/">
                                                        our terms{" "}
                                                    </a>
                                                    and the{" "}
                                                    <a
                                                        className={styles.fadedBlue}
                                                        href="https://stripe.com/au/connect-account/legal"
                                                    >
                                                        Stripe Connected Account Agreement
                                                    </a>
                                                    .
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        )
    }
}
