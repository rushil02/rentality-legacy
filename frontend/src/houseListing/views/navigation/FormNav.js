import React, {Component} from 'react';
import './FormNav.css'
import {NavLink} from "react-router-dom";
import {alertUser} from "core/alert/Alert";


export default function FormNav(props) {
    const preventClick = e => {
        e.preventDefault();
        alertUser.init({
            message: "Please fill the 'About the Property' Form first!",
            alertType: "warning",
            autoHide: true
        })
    };

    let disableLinks = (props.mode === 'create');
    let progressVal = Math.round((100/12) * props.currForm);

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="full-header">
                    <div className="row">
                        <div id="full-header-1" className="col-md-4 text-center">
                            <NavLink to="/1" className="nostyle form-change"><span className="number">1</span><span
                                    className="text">Basic Home info</span></NavLink>
                        </div>
                        <div id="full-header-2" className="col-md-4 text-center">
                            {disableLinks ?
                                <NavLink to="/5" className="nostyle form-change" onClick={preventClick}><span
                                    className="number">2</span><span
                                    className="text">Detail Description</span></NavLink>
                                :
                                <NavLink to="/5" className="nostyle form-change"><span className="number">2</span><span
                                    className="text">Detail Description</span></NavLink>
                            }
                        </div>
                        <div id="full-header-3" className="col-md-4 text-center">
                            {disableLinks ?
                                <NavLink to="/9" className="nostyle form-change" onClick={preventClick}><span
                                    className="number">3</span><span
                                    className="text">About you</span></NavLink>
                                :
                                <NavLink to="/9" className="nostyle form-change"><span className="number">3</span><span
                                    className="text">About you</span></NavLink>
                            }
                        </div>
                    </div>
                    <div className="progress">
                        <div id="progress-bar" className="progress-bar bg-success" style={{"width": progressVal+"%"}} aria-valuenow={progressVal} aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}