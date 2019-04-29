import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import './FormSubNav.css'
import {alertUser} from "../../../core/alert/Alert";

function preventClick(e) {
    e.preventDefault();
    alertUser.init({
        message: "Please fill the 'About the Property' Form first!",
        alertType: "warning",
        autoHide: true
    })
}

function getNavLink(path, verbose, disabled) {
    if (disabled) {
        return (
            <NavLink to={path} className="nostyle form-change" onClick={preventClick}>
                <div id="sub-title-1" className="title">{verbose}</div>
            </NavLink>
        )
    } else {
        return (
            <NavLink to={path} className="nostyle form-change">
                <div id="sub-title-1" className="title">{verbose}</div>
            </NavLink>
        )
    }

}

export default class FormSubNav extends Component {

    createSubNav = () => {

        let disableLinks = (this.props.mode === 'create');
        return (
            <React.Fragment>
                <div className="row sub-header-row">
                    <div className="col-md-3">
                        {getNavLink("/1", "About the Property", false)}
                    </div>
                    <div className="col-md-3">
                        {getNavLink("/2", "Rent & Availability", disableLinks)}
                    </div>
                    <div className="col-md-3">
                        {getNavLink("/3", "Facilities", disableLinks)}
                    </div>
                    <div className="col-md-3">
                        {getNavLink("/4", "Rules", disableLinks)}
                    </div>
                </div>

            </React.Fragment>
        )
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className="header">
                            {this.createSubNav()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}