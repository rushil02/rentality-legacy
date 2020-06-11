import React, { Component } from "react"
import styles from "./style.module.css"

export default class Error404 extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row" style={{ paddingTop: "10%", marginBottom: "10%" }}>
                        <div className="col-sm-3" />
                        <div className="col-sm-6">
                            <div className={"card " + styles.pageErrorCard}>
                                <div className="card-body">
                                    <h1>404</h1>
                                    <h5 className="card-title">Oops, the page you're looking for does not exist.</h5>
                                    <p className="card-text">
                                        You may want to head back to the homepage. Or report the problem if you think
                                        something is broken.
                                    </p>
                                    {/*<a href="#" className="btn btn-default-color">Go somewhere</a>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
