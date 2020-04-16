import React, { Component } from "react";
import styles from "search/views/forms/SearchForm.css";

// TODO:
export default class HouseType extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-md-3">
                    <select
                        name="home_type"
                        placeholder="Home Type"
                        id="id_home_type"
                        className={styles.formControl + " " + styles.type}
                        onChange={e => {
                            this.props.onChange("homeType", e.target.value);
                        }}
                        defaultValue={this.props.value}
                    >
                        <option value="">Select Home Type</option>

                        <option value="1">Whole Apartment</option>

                        <option value="2">Whole House</option>

                        <option value="3">
                            Room in Share-house with Private bathroom
                        </option>

                        <option value="4">
                            Room in Share-house with Shared bathroom
                        </option>

                        <option value="5">Student Accommodation</option>

                        <option value="6">Home Stay</option>

                        <option value="7">Granny Flat</option>
                    </select>
                </div>
            </React.Fragment>
        );
    }
}
