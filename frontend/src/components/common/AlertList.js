import React, {Component} from 'react';
import './Alert.css';
import AlertComponent from './Alert';

export default class AlertListComponent extends Component {

    render() {
        let alerts = this.props.alertList;
        return (
            <React.Fragment>
                <div className="alerts-holder">
                    {alerts.map((alert, i) => <AlertComponent details={alert} key={i}/>)}
                </div>
            </React.Fragment>
        );
    }
}
