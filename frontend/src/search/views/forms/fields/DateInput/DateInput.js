import React, {Component} from 'react';

export default class DateInput extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="col-md-3">
                    <div>
                        <div className="dropdown">
                            <input type="text" className="form-control date" placeholder="Select Dates" readOnly
                                id="placeholder-date"
                                data-toggle="dropdown" required />
                            <div className="dropdown-menu">
                                <div className="calendar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}