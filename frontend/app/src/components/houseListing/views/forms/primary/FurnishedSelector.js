import React, { Component } from "react"
import Select from "react-select"
import kitchenIcon from "images/form-1/kitchen.svg"

function substituteVerbose(key, verbose) {
    const subs = {
        Y: "Furnished",
        N: "Unfurnished",
    }

    if (subs.hasOwnProperty(key)) {
        return subs[key]
    } else {
        return verbose
    }
}

export default class FurnishedSelectorComponent extends Component {
    getValue = key => {
        let value = ""
        if (Object.keys(this.props.formOptions).length > 0) {
            value = {
                value: key,
                label: substituteVerbose(key, this.props.formOptions[key]),
            }
        }
        return value
    }

    getList = () => {
        let furnishedOptions = []
        if (Object.keys(this.props.formOptions).length > 0) {
            furnishedOptions = Object.entries(this.props.formOptions).map(item => {
                return { value: item[0], label: substituteVerbose(item[0], item[1]) }
            })
        }
        return furnishedOptions
    }

    render() {
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
            }),

            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1
                const transition = "opacity 300ms"

                return { ...provided, opacity, transition }
            },
            control: (provided, state) => ({
                border: "none",
                cursor: "text",
                display: "flex",
                flexWrap: "wrap",
                paddingTop: "6px",
                paddingBottom: "6px",
            }),

            container: (provided, state) => ({
                backgroundImage: `url(${kitchenIcon})`,
                position: "relative",
                fontSize: "15px",
                color: "#676767",
                fontWeight: "400",
                borderBottom: state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                paddingLeft: "40px",
                marginTop: "5px",
                boxShadow: state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
            }),
        }

        return (
            <React.Fragment>
                <Select
                    styles={customStyles}
                    options={this.getList()}
                    placeholder="Select Furnished Option"
                    onChange={e => this.props.onFieldChange("furnished", e.value)}
                    value={this.getValue(this.props.value)}
                />
            </React.Fragment>
        )
    }
}
