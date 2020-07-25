import React, { Component } from "react"
import styles from "../SearchForm.module.css"

export default class Rent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-md-3 col-lg-2">
                    <input
                        type="text"
                        name="rent"
                        placeholder="Rent $AUD/week"
                        id="id_rent"
                        className={styles.formControl + " " + styles.amount}
                        onChange={e => {
                            this.props.onChange("rent", e.target.value)
                        }}
                        defaultValue={this.props.value}
                    />
                </div>
            </React.Fragment>
        )
    }
}
