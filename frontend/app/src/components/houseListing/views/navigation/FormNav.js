import React, {Component} from 'react';
import styles from './FormNav.module.css'
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
    let progressVal = Math.round((100 / 12) * props.currForm);

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className={styles.fullHeader}>
                    <div className="row">
                        <div id="full-header-1" className="col-md-4 text-center">
                            {disableLinks ?
                                <NavLink to="/" className={styles.noStyle} activeClassName={styles.active}
                                         onClick={(e) => e.preventDefault()}
                                         isActive={() => !![1, 2, 3, 4].includes(props.currForm)}><span
                                    className={styles.number}>1</span><span
                                    className="text">Basic Home info</span></NavLink>
                                :
                                <NavLink to="/1" className={styles.noStyle} activeClassName={styles.active}
                                         isActive={() => !![1, 2, 3, 4].includes(props.currForm)}><span
                                    className={styles.number}>1</span><span
                                    className="text">Basic Home info</span></NavLink>
                            }
                        </div>
                        <div id="full-header-2" className="col-md-4 text-center">
                            {disableLinks ?
                                <NavLink to="/5" className={styles.noStyle} activeClassName={styles.active}
                                         onClick={preventClick}><span
                                    className={styles.number}>2</span><span
                                    className="text">Detail Description</span></NavLink>
                                :
                                <NavLink to="/5" className={styles.noStyle} activeClassName={styles.active}
                                         isActive={() => !![5, 6, 7, 8].includes(props.currForm)}><span
                                    className={styles.number}>2</span><span
                                    className="text">Details & Description</span></NavLink>
                            }
                        </div>
                        <div id="full-header-3" className="col-md-4 text-center">
                            {disableLinks ?
                                <NavLink to="/9" className={styles.noStyle} activeClassName={styles.active}
                                         onClick={preventClick}><span
                                    className={styles.number}>3</span><span
                                    className="text">About you</span></NavLink>
                                :
                                <NavLink to="/9" className={styles.noStyle} activeClassName={styles.active}
                                         isActive={() => !![9, 10, 11, 12].includes(props.currForm)}><span
                                    className={styles.number}>3</span><span
                                    className="text">About you</span></NavLink>
                            }
                        </div>
                    </div>
                    <div className={"progress " + styles.progress}>
                        <div id="progress-bar" className={"progress-bar bg-success " + styles.progressBar}
                             style={{"width": progressVal + "%"}}
                             aria-valuenow={progressVal} aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}