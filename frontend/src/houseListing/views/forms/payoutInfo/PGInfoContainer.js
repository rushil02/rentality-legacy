import React, {Component} from 'react';
import {alertUser} from "core/alert/Alert";
import Select from "react-select";
import FileInputComponent from "core/UIComponents/FileInput/FileInputComponent";
import styles from "./PayoutInfoContainer.css";
import {PulseLoader} from "react-spinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPen, faPlus} from "@fortawesome/free-solid-svg-icons";


export default class PGInfoContainer extends Component {
    getBadge = () => {
        if (this.props.statusBI === 'Incomplete') {
            return (
                <span className="badge badge-danger"
                      style={{marginLeft: "20px"}}>Please Complete Billing Information</span>
            )
        } else {
            return null
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
                title: "Save",
                action: (e) => {
                    e.stopPropagation();
                    this.onSave()
                },
                icon: faCheck,
            };
        } else {
            buttonConfig = {
                title: "Edit",
                action: (e) => {
                    e.stopPropagation();
                    this.toggleEditState(true)
                },
                icon: faPen,
            };
        }

        return (
            <button
                className={"btn btn-primary btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                type="button"
                title={buttonConfig.title}
                onClick={buttonConfig.action}
                aria-controls={"collapsibleCalendar-"}>
                <FontAwesomeIcon icon={buttonConfig.icon}/>
            </button>
        )
    };


    render() {
        return (
            <React.Fragment>
                <div className={"card mb-3 " + styles.accordianBorder}>
                    <div className={"card-body " + styles.cardBody}>
                        <div className={styles.cardTextContent}>
                            <span><b>Payment Information</b></span>
                            {this.getBadge()}
                        </div>
                        <div className='loading-container'>
                            <PulseLoader
                                // css={override}
                                sizeUnit={"px"}
                                size={10}
                                color={'#3fc692'}
                                loading={false}
                            />
                        </div>

                        <div className={styles.cardButtonGroup}>
                            <button
                                className={"btn btn-primary btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                                type="button"
                                title={"Edit"}
                                // onClick={""}
                                // aria-controls={"collapsibleCalendar-" + props.idKey}
                            >
                                <FontAwesomeIcon icon={faPen}/>
                            </button>
                        </div>
                    </div>
                    <div className={"collapse " + styles.availabilitySelectorContainer}>
                        <div className="col-md-11">
                            <div className="row">
                                <div className="col-md-1"/>
                                <div className="col-md-auto col-lg-1 col-xl-1"/>
                                <div className="col-md-12 col-lg-6 col-xl-5">
                                    <div className="row">


                                    </div>
                                </div>
                                <div className="col-md-auto col-lg-1 col-xl-1"/>
                                <div className="col-md-12 col-lg-4 col-xl-5">
                                    <div className="row">
                                        {/*<div className="col-md-12">*/}
                                        {/*    <div className="input no-background">*/}
                                        {/*        <input type="text" className="inp-routing-number form-control"*/}
                                        {/*               name="routing_number" placeholder="BSB"/>*/}
                                        {/*    </div>*/}
                                        {/*    <div id="bank-error-message" className="invalid-feedback"/>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-12">*/}
                                        {/*    <div className="input no-background">*/}
                                        {/*        <input type="text" className="inp-account-number form-control"*/}
                                        {/*               name="account_number" placeholder="Account Number"/>*/}
                                        {/*    </div>*/}
                                        {/*    <div id="bank-warning-message" className="invalid-feedback"/>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{"marginTop": "50px"}}>
                                {/*<div className="col-md-12 text-right">*/}
                                {/*    <p>By clicking, you agree to <a href="/pages/tos/">our*/}
                                {/*        terms</a>*/}
                                {/*        and the <a href="https://stripe.com/au/connect-account/legal">Stripe*/}
                                {/*            Connected*/}
                                {/*            Account Agreement</a>.</p>*/}
                                {/*</div>*/}
                                {/*<div className="col-md-12">*/}
                                {/*    <div className="button top-margin">*/}

                                {/*        <button type="submit" className="btn btn-link" id="submit-and-exit">Save and*/}
                                {/*            Exit*/}
                                {/*        </button>*/}
                                {/*        <a type="submit" className="btn btn-link" id="next-step">List house</a>*/}
                                {/*        <button type="submit" className="btn btn-link d-none" id="list-now">Empty*/}
                                {/*        </button>*/}
                                {/*        <a type="button"*/}
                                {/*           href="/property/add/f45d9cff-0544-44b7-9f43-400fd95b44a7/#form-11"*/}
                                {/*           className="btn btn-link" id="prev-step">Back</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}