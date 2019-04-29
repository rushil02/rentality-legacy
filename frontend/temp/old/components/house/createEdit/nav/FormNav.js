import React, {Component} from 'react';
import './FormNav.css'
import {NavLink} from "react-router-dom";


export default class FormNav extends Component {
    render() {
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
                                <NavLink to="/5" className="nostyle form-change"><span className="number">2</span><span
                                    className="text">Detail Description</span></NavLink>
                            </div>
                            <div id="full-header-3" className="col-md-4 text-center">
                                <NavLink to="/9" className="nostyle form-change"><span className="number">3</span><span
                                    className="text">About you</span></NavLink>
                            </div>
                        </div>
                        <div className="progress">
                            <div id="progress-bar" className="progress-bar bg-success"/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}