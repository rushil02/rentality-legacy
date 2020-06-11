import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import styles from './FormSubNav.module.css'
import parentStyles from './FormNav.module.css'

import {alertUser} from "components/alert/Alert";

import routes from "components/routes";
import {reverse} from "named-urls";

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
        if (path === '/1') {

            path = reverse(routes.pages.listing.create);
            return (
                <NavLink to={path} className={parentStyles.noStyle} activeClassName={styles.active}>
                    <div className={styles.title}>{verbose}</div>
                </NavLink>
            )
        }
        return (
            <NavLink to={path} className={parentStyles.noStyle} onClick={preventClick} activeClassName={styles.active}>
                <div className={styles.title}>{verbose}</div>
            </NavLink>
        )
    } else {
        return (
            <NavLink to={path} className={parentStyles.noStyle} activeClassName={styles.active}>
                <div className={styles.title}>{verbose}</div>
            </NavLink>
        )
    }

}

export default class FormSubNav extends Component {

    createSubNav = () => {

        let disableLinks = (this.props.mode === 'create');
        if ([1, 2, 3, 4].includes(this.props.currForm)) {
            return (
                <React.Fragment>
                    <div className="row sub-header-row">
                        <div className="col-md-3">
                            {getNavLink("/1", "About the Property", disableLinks)}
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
        } else if ([5, 6, 7, 8].includes(this.props.currForm)) {
            return (
                <React.Fragment>
                    <div className="row sub-header-row">
                        <div className="col-md-3">
                            {getNavLink("/5", "Images", disableLinks)}
                        </div>
                        <div className="col-md-3">
                            {getNavLink("/6", "Cancellation Policy", disableLinks)}
                        </div>
                        <div className="col-md-3">
                            {getNavLink("/7", "Information for Guests", disableLinks)}
                        </div>
                        <div className="col-md-3">
                            {getNavLink("/8", "Neighbourhood", disableLinks)}
                        </div>
                    </div>

                </React.Fragment>
            )
        } else if ([9, 10, 11, 12].includes(this.props.currForm)) {
            return (
                <React.Fragment>
                    <div className="row sub-header-row">
                        <div className="col-md-3">
                            {getNavLink("/9", "Profile Photo", disableLinks)}
                        </div>
                        <div className="col-md-3">
                            {getNavLink("/10", "Fun Tags", disableLinks)}
                        </div>
                        <div className="col-md-3">
                            {getNavLink("/11", "Welcome", disableLinks)}
                        </div>
                        <div className="col-md-3">
                            {getNavLink("/12", "Bank Details", disableLinks)}
                        </div>
                    </div>

                </React.Fragment>
            )
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.header}>
                            {this.createSubNav()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}