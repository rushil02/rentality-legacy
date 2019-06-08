import React, { Component } from 'react';

export default class Rent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-md-2">
                    <input type="text" name="rent" placeholder="Rent $AUD/week" id="id_rent" className="form-control amount" 
                    onChange={this.props.onChange} defaultValue={this.props.value}
                    />
                </div>
            </React.Fragment>
        );
    }
}