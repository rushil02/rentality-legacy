import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import './FormSubNav.css'

export default class FormSubNav extends Component {
    constructor(props) {
        super(props);
    }

    createSubNav = () => {

        return (
            <React.Fragment>
                <div id="sub-header-1" className="row sub-header-row">
                    <div className="col-md-3">
                        <NavLink to="/1" className="nostyle form-change">
                            <div id="sub-title-1" className="title">About the property</div>
                        </NavLink>
                    </div>
                    <div className="col-md-3">
                        <NavLink to="/2" className="nostyle form-change">
                            <div id="sub-title-2" className="title">Rent & Availability
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-3">
                        <NavLink to="/3" className="nostyle form-change">
                            <div id="sub-title-3" className="title">Facilities</div>
                        </NavLink>
                    </div>
                    <div className="col-md-3">
                        <NavLink to="/4" className="nostyle form-change">
                            <div id="sub-title-4" className="title">Rules</div>
                        </NavLink>
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