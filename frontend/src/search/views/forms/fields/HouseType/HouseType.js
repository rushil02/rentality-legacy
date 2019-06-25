import React, { Component } from 'react';


// TODO:
export default class HouseType extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-md-2">
                    <select name="home_type" placeholder="Home Type" id="id_home_type" className="form-control type" onChange={this.props.onChange} defaultValue={this.props.value}>
                        <option value="">Select Home Type</option>

                        <option value="1">Whole Apartment</option>

                        <option value="2">Whole House</option>

                        <option value="3">Room in Share-house with Private bathroom</option>

                        <option value="4">Room in Share-house with Shared bathroom</option>

                        <option value="5">Student Accommodation</option>

                        <option value="6">Home Stay</option>

                        <option value="7">Granny Flat</option>

                    </select>
                </div>
            </React.Fragment>
        );
    }
}