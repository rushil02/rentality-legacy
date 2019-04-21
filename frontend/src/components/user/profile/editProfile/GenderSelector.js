import React, { Component } from 'react';
import Select from 'react-select'


function substituteVerbose(key, verbose) {
    const subs = {
        'M': 'Male',
        'F': 'Female'
    };

    if (subs.hasOwnProperty(key)) {
        return subs[key]
    } else {
        return verbose
    }

}

export default class GenderSelectorComponent extends Component {

    getValue = (key) => {
        let value = '';
        if (Object.keys(this.props.formOptions).length > 0) {
            value = {
                value: key,
                label: substituteVerbose(key, this.props.formOptions[key])
            };
        }
        return value;
    };

    getList = () => {
        return [
            {
                value: 'M',
                label: 'Male'
            },
            {
                value: 'F',
                label: 'Female'
            }
        ]
    };

    render() {

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
            }),

            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
            },
            control: (provided, state) => ({
                border: "none",
                cursor: "text",
                display: "flex",
                "flex-wrap": "wrap",
                "padding-top": "6px",
                "padding-bottom": "6px",
            }),

            container: (provided, state) => ({
                "background-image": "url(/static/image/gender/gender-neutral.svg)",
                "position": "relative",
                "font-size": "15px",
                "color": "#676767",
                "font-weight": "400",
                "border-bottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
                "background-repeat": "no-repeat",
                "background-position": "left center",
                "padding-left": "40px",
                "margin-top": "5px",
                "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
            })
        };


        return (
            <React.Fragment>
                <Select
                    styles={customStyles}
                    options={this.getList()}
                    placeholder="Select Furnished Option"
                    onChange={(e) => this.props.onFieldChange("gender", e.value)}
                    value={this.getValue(this.props.value)}
                />
            </React.Fragment>
        )
    }
}