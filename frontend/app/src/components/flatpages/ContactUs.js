import React, { Component } from "react"
import styles from "./ContactUs.module.css"

export default class ContactUs extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.contactUs}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-xl-12">
                                <div className={styles.left}>
                                    <h1>Customer Support </h1>
                                    <div className="row">
                                        <div className="col-md-8 col-lg-8">
                                            <h2> Contact Details </h2>
                                            <br />
                                            Email: admin@rentality.com.au
                                            <br />
                                            Operating Hours: Monday - Friday 9.00 AM to 5.00 PM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
