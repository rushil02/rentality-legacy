import React, { Component } from "react"
import Select from "react-select"

export default class HomeTypeSelectorComponent extends Component {
    getValue = key => {
        let value = ""
        if (Object.keys(this.props.formOptions).length > 0 && key > 0) {
            value = {
                value: key,
                label: this.props.formOptions[key],
            }
        }
        return value
    }

    getList = () => {
        let homeTypeOptions = []
        if (Object.keys(this.props.formOptions).length > 0) {
            homeTypeOptions = Object.entries(this.props.formOptions).map(item => {
                return { value: Number(item[0]), label: item[1] }
            })
        }
        return homeTypeOptions
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
                backgroundImage: "url(/static/image/form-1/type.svg)",
                position: "relative",
                fontSize: "15px",
                color: "#676767",
                fontWeight: "400",
                borderBottom: state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                paddingLeft: "40px",
                marginTop: "5px",
                WebkitTransition: "all 0.30s ease-in-out",
                MozTransition: "all 0.30s ease-in-out",
                msTransition: "all 0.30s ease-in-out",
                OTransition: "all 0.30s ease-in-out",
                boxShadow: state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
            }),
        }

        return (
            <React.Fragment>
                <Select
                    styles={customStyles}
                    options={this.getList()}
                    placeholder="Select Home Type"
                    onChange={e => this.props.onFieldChange("homeType", e.value)}
                    value={this.getValue(this.props.value)}
                />
            </React.Fragment>
        )
    }
}
