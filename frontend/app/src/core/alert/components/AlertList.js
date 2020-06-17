import React, { Component } from "react"
import styles from "./Alert.module.css"
import AlertComponent from "./Alert"

export default class AlertListComponent extends Component {
    render() {
        let alerts = this.props.alertList
        return (
            <React.Fragment>
                <div className={styles.alertsHolder}>
                    {alerts.map((alert, i) => (
                        <AlertComponent details={alert} key={i} />
                    ))}
                </div>
            </React.Fragment>
        )
    }
}
