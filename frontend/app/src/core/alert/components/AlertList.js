import React, {Component, useState} from "react"
import styles from "./Alert.module.css"
import {Alert} from "react-bootstrap";


export default class AlertListComponent extends Component {
    render() {
        let alerts = this.props.alertList
        return (
            <React.Fragment>
                <div className={styles.alertsHolder}>
                    {alerts.map((alert, i) => (
                        <AlertComponent details={alert} key={i} idx={i}/>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

function AlertComponent(props) {
    const [show, setShow] = useState(true);
    if (props.details.autoHide){
        setTimeout(() => {  setShow(false) }, 4000);
    }

    if (show) {
        return (
            <div className={styles.alertRow}>
                <Alert key={props.idx} variant={props.details.alertType} className={styles.alert}
                       onClose={() => setShow(false)} dismissible>
                    {props.details.message}
                </Alert>
            </div>
        )
    } else {
        return null
    }
}