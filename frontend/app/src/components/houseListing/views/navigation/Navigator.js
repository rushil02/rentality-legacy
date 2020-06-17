import React, { Component, Suspense } from "react"
import styles from "./Navigator.module.css"
import FormSubNav from "./FormSubNav"
import FormNav from "./FormNav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton"
import { activateHouse, deleteHouse } from "components/houseListing/services"
import { alertUser } from "core/alert/Alert"
import { DeleteModal, ActivateModal } from "./Modals"
import {reverse} from "named-urls"
import routes from "components/routes"
import {withRouter} from "react-router-dom";

const exitRoute = reverse(routes.pages.dashboard.home);

class Navigator extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        console.log(this.props)
    }

    onNext = data => {
        console.log("Adasd", data)
        if (this.props.mode === "create") {
            this.props.navContext.data.nextToEditMode(data.getData("UUID"))
        } else {
            console.log("hrer");
            this.props.history.push("/" + (this.props.navContext.data.currForm + 1))
        }
    }

    onBack = () => {
        this.props.history.push("/" + (this.props.navContext.data.currForm - 1))
    }

    onExit = () => {
        window.location.href = exitRoute
    }

    onDelete = () => {
        if (this.props.mode === "edit") {
            const houseUUID = this.props.houseUUID
            return new Promise(function (resolve, reject) {
                deleteHouse(houseUUID)
                    .then(() => {
                        resolve()
                    })
                    .catch(() => alertUser.init({ stockAlertType: "generic" }))
            })
        }
    }

    onActivate = () => {
        if (this.props.mode === "edit") {
            const houseUUID = this.props.houseUUID
            return new Promise(function (resolve, reject) {
                activateHouse(houseUUID)
                    .then(() => {
                        resolve()
                    })
                    .catch(() => {
                        alertUser.init({
                            message: "Please fill in all the details.",
                            alertType: "danger",
                            autoHide: true,
                        })
                        reject()
                    })
            })
        }
    }

    // FIXME: URGENT - Not being used get status from formOptions
    onDeactivate = () => {
        if (this.props.mode === "edit") {
            const houseUUID = this.props.houseUUID
            return new Promise(function (resolve, reject) {
                deleteHouse(houseUUID)
                    .then(() => {
                        resolve()
                    })
                    .catch(() => {
                        alertUser.init({ stockAlertType: "generic" })
                        reject()
                    })
            })
        }
    }

    render() {
        return (
            <NavigatorComponent
                navContext={this.props.navContext}
                onNext={this.onNext}
                onBack={this.onBack}
                onExit={this.onExit}
                onDelete={this.onDelete}
                onActivate={this.onActivate}
                mode={this.props.mode}
                children={this.props.children}
            />
        )
    }
}

export default withRouter(Navigator);

function NavigatorComponent(props) {
    let backBtn
    let saveNextBtn
    let currFormState
    let currFormCallback
    try {
        currFormState = props.navContext.data.getCurrentFormState()
    } catch (e) {
        currFormState = "initial"
    }
    try {
        currFormCallback = props.navContext.data.getCurrentSaveCallback()
    } catch (e) {
        currFormCallback = new Promise(function () {})
    }

    if (props.navContext.data.currForm === 1) {
        backBtn = ""
    } else {
        backBtn = (
            <a type="button" className={"btn float-left " + styles.btn} id="prev-step" onClick={props.onBack}>
                Back
            </a>
        )
    }

    if (props.navContext.data.currForm === 12) {
        saveNextBtn = (
            <ActivateModal
                onActivate={props.onActivate}
                isAPIRequestButton={true}
                isDisabled={currFormState !== "hasChanged"}
            />
        )
    } else {
        saveNextBtn = (
            <APIRequestButton
                textOption={"saveNext"}
                callback={currFormCallback}
                onSuccess={props.onNext}
                onFailure={() => {}}
                containerID={"main-input-page"}
                formState={currFormState}
            />
        )
    }

    return (
        <React.Fragment>
            <div className={styles.pageForm} id="main-input-page">
                <FormNav mode={props.mode} currForm={props.navContext.data.currForm} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-1" />
                        <div className="col-xl-10">
                            <div className="right">
                                <FormSubNav mode={props.mode} currForm={props.navContext.data.currForm} />
                                {props.mode === "edit" ? (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="dropdown float-right">
                                                <div
                                                    className={"dropdown-toggle " + styles.formSettings}
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <FontAwesomeIcon icon={faCog} size="lg" />
                                                </div>
                                                <div
                                                    className={
                                                        "dropdown-menu dropdown-menu-right " + styles.dropdownList
                                                    }
                                                    id="dropdown-list"
                                                >
                                                    <APIRequestButton
                                                        layoutClasses={"dropdown-item " + styles.dropdownItem}
                                                        textOption={"save"}
                                                        loaderSize={6}
                                                        callback={currFormCallback}
                                                        containerID={"main-input-page"}
                                                    />
                                                    <APIRequestButton
                                                        layoutClasses={"dropdown-item " + styles.dropdownItem}
                                                        textOption={"saveExit"}
                                                        loaderSize={6}
                                                        callback={currFormCallback}
                                                        onSuccess={props.onExit}
                                                        containerID={"main-input-page"}
                                                    />
                                                    <hr />
                                                    <ActivateModal onActivate={props.onActivate} />
                                                    <hr />
                                                    <DeleteModal onDelete={props.onDelete} onSuccess={props.onExit} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                {props.children}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={styles.button}>
                                            {backBtn}
                                            {saveNextBtn}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-1" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
