import React, {Component} from 'react';
import './Navigator.css';
import FormSubNav from "./FormSubNav";
import FormNav from "./FormNav";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/free-solid-svg-icons'
import {NavigationContext} from "houseListing/dataContext";
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton";


export default class Navigator extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {};
    }

    render() {
        return (
            <NavigationContext.Consumer>
                {navContext => {
                    return NavigatorComponent(this.props, navContext)
                }}
            </NavigationContext.Consumer>
        )
    }
}


function NavigatorComponent(props, navContext) {
    let backBtn;

    if (navContext.data.currForm === 1) {
        backBtn = "";
    } else {
        backBtn = <a type="button" className="btn btn-link float-left" id="prev-step">Back</a>
    }

    return (
        <React.Fragment>
            <FormNav mode={props.mode} currForm={navContext.data.currForm}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-1"/>
                    <div className="col-xl-10">
                        <div className="right">
                            <FormSubNav mode={props.mode}/>
                            <div className="col-12">
                                <div className="float-right">
                                    <div className="dropdown">
                                        <div id="form-settings" className="dropdown-toggle" data-toggle="dropdown"
                                             aria-haspopup="true"
                                             aria-expanded="false">
                                            <FontAwesomeIcon icon={faCog} size="lg"/>
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-right" id="dropdown-list">
                                            <a className="dropdown-item" href="#">Save</a>
                                            <a className="dropdown-item" href="#">Save & Exit</a>
                                            <hr/>
                                            <a className="dropdown-item" href="#">List</a>
                                            <a className="dropdown-item" href="#">UnList</a>
                                            <hr/>
                                            <a className="dropdown-item" style={{"color": "red"}} href="#">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {props.children}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="button top-margin">
                                        {backBtn}
                                        <APIRequestButton
                                            textOption={'save'}
                                            callback={navContext.data.saveCallback}
                                            layoutClasses={"btn btn-link float-right"}
                                        />
                                        {/*<a type="button" className="btn btn-link float-right" id="next-step"*/}
                                           {/*onClick={navContext.data.saveCallback}>Save &*/}
                                            {/*Next</a>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-1"/>
                </div>
            </div>
        </React.Fragment>
    )
}