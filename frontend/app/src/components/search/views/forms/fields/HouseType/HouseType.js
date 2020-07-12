import React, { Component } from "react"
import Select from "react-select"
import { FormOptions } from "../../../../models"
import { getHouseFilterOptions } from "../../../../services"

export default class HouseType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterOptions: new FormOptions({}),
        }
    }

    componentDidMount() {
        getHouseFilterOptions().then(result => {
            this.setState({ filterOptions: new FormOptions(result) })
            console.log(this.state)
        })
    }

    getValue = key => {
        let value = ""
        if (Object.keys(this.state.filterOptions.homeTypeOptions).length > 0 && key > 0) {
            value = {
                value: key,
                label: this.state.filterOptions.homeTypeOptions[key],
            }
        }
        return value
    }

    getList = () => {
        let homeTypeOptions = []
        if (Object.keys(this.state.filterOptions.homeTypeOptions).length > 0) {
            homeTypeOptions = Object.entries(this.state.filterOptions.homeTypeOptions).map(item => {
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
                // borderBottom: "1px solid #c7cdd9",
                borderRadius: 0,
                height: "calc(2.25rem + 9px)",
                cursor: "text",
                display: "flex",
                flexWrap: "wrap",
                paddingTop: "1px",
                paddingBottom: "1px",
                // paddingTop: "6px",
                color: "#2a2b32",
                width: "100%",

                // paddingBottom: "6px",
            }),
            placeholder: (provided, state) => {
                return {
                    ...provided,
                    fontSize: "13px",
                    color: "#2a2b32",
                    fontWeight: "400",
                }
            },

            option: (provided, state) => {
                return {
                    ...provided,
                    fontSize: "13px",
                    color: "#2a2b32",
                    fontWeight: "400",
                }
            },

            valueContainer: (provided, state) => {
                return {
                    ...provided,
                    paddingLeft: "0px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }
            },

            container: (provided, state) => ({
                backgroundImage: "url(/static/image/form-1/type.svg)",
                backgroundSize: "19px",
                position: "relative",
                fontSize: "13px",
                color: "#676767",
                fontWeight: "400",
                borderBottom: state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                paddingLeft: "30px",
                WebkitTransition: "all 0.30s ease-in-out",
                MozTransition: "all 0.30s ease-in-out",
                msTransition: "all 0.30s ease-in-out",
                OTransition: "all 0.30s ease-in-out",
                boxShadow: state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
            }),
        }

        return (
            <React.Fragment>
                <div className="col-md-3 col-lg-3">
                    <Select
                        styles={customStyles}
                        options={this.getList()}
                        placeholder="Select Home Type"
                        onChange={e => this.props.onChange("homeType", e.value)}
                        value={this.getValue(this.props.value)}
                    />
                </div>
            </React.Fragment>
        )
    }
}
