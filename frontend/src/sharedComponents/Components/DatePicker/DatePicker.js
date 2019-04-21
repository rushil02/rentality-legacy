import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import './DatePicker.css';

export default class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
    }

    // redner() {
    //     let { label, value, onChange, datakey } = this.props;
    //     value = new Date(value);
    //     return (
    //         <React.Fragment>

    //         </React.Fragment>
    //     );
    // }

    render() {
        /**
         * extraProps are sent as a parameter. Add Date picker properties in extraProps.
         * Eg. extraProps={{maxDate: new Date()}}
         */
        let { label, value, onChange, datakey, maxDate } = this.props;
        const extraProps = this.props.extraProps;
        value = value? new Date(value): '';
        return (
            <div className="row">
                {Boolean(label) && <div className="col-md-4">{label}</div>}
                <div className={`${label ? 'col-md-8' : 'col-md-12'} text-right`}>
                    <DatePicker
                        value={value}
                        className="rt-date-picker"
                        onChange={(value) => onChange(datakey, value)}
                        format='dd-MM-y'
                        {...extraProps}
                    />
                </div>
            </div>
        );
    }
}
