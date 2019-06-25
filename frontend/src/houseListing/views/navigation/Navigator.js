import React, {Component} from 'react';
import styles from './Navigator.css';
import FormSubNav from "./FormSubNav";
import FormNav from "./FormNav";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/free-solid-svg-icons'
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton";
import {withRouter} from "react-router-dom";


class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onNext = (data) => {
        if (this.props.mode === 'create') {
            this.props.navContext.data.nextToEditMode(data.getData('UUID'))
        } else {
            this.props.history.push('/' + (this.props.navContext.data.currForm + 1))
        }

    };

    onBack = () => {
        this.props.history.push('/' + (this.props.navContext.data.currForm - 1))
    };

    render() {
        return (
            <NavigatorComponent
                navContext={this.props.navContext}
                onNext={this.onNext}
                onBack={this.onBack}
                mode={this.props.mode}
                children={this.props.children}
            />
        )
    }
}

export default withRouter(Navigator);


function NavigatorComponent(props) {
    let backBtn;
    let currFormState;
    let currFormCallback;
    try {
        currFormState = props.navContext.data.getCurrentFormState()
    } catch (e) {
        currFormState = 'initial'
    }
    try {
        currFormCallback = props.navContext.data.getCurrentSaveCallback()
    } catch (e) {
        currFormCallback = new Promise(function () {
        })
    }

    if (props.navContext.data.currForm === 1) {
        backBtn = "";
    } else {
        backBtn = <a type="button" className={"btn float-left " + styles.btn} id="prev-step" onClick={props.onBack}>Back</a>
    }

    return (
        <React.Fragment>
            <div className={styles.pageForm} id="main-input-page">
                <FormNav mode={props.mode} currForm={props.navContext.data.currForm}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-1"/>
                        <div className="col-xl-10">
                            <div className="right">
                                <FormSubNav mode={props.mode} currForm={props.navContext.data.currForm}/>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="dropdown float-right">
                                            <div className={"dropdown-toggle " + styles.formSettings}
                                                 data-toggle="dropdown"
                                                 aria-haspopup="true"
                                                 aria-expanded="false">
                                                <FontAwesomeIcon icon={faCog} size="lg"/>
                                            </div>
                                            <div className={"dropdown-menu dropdown-menu-right " + styles.dropdownList}
                                                 id="dropdown-list">
                                                <a className="dropdown-item" href="#">Save</a>
                                                <a className="dropdown-item" href="#">Save & Exit</a>
                                                <hr/>
                                                <a className="dropdown-item" href="#">List</a>
                                                <a className="dropdown-item" href="#">UnList</a>
                                                <hr/>
                                                <a className="dropdown-item" style={{"color": "red"}}
                                                   href="#">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {props.children}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={styles.button}>
                                            {backBtn}
                                            <APIRequestButton
                                                textOption={'saveNext'}
                                                callback={currFormCallback}
                                                onSuccess={props.onNext}
                                                onFailure={() => {
                                                }}
                                                containerID={"main-input-page"}
                                                formState={currFormState}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-1"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}