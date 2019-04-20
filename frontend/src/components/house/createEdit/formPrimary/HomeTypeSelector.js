import React, {Component} from 'react';
import Select from 'react-select'

export default class HomeTypeSelectorComponent extends Component {

    getValue = (key) => {
        let value = '';
        if (Object.keys(this.props.formOptions).length > 0 && key > 0) {
            value = {
                value: key,
                label: this.props.formOptions[key]
            };
        }
        return value;
    };

    getList = () => {
        let homeTypeOptions = [];
        if (Object.keys(this.props.formOptions).length > 0) {
            homeTypeOptions = Object.entries(this.props.formOptions).map(item => {
                return {value: Number(item[0]), label: item[1]}
            });
        }
        return homeTypeOptions;
    };

    render() {

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
            }),

            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return {...provided, opacity, transition};
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
                "background-image": "url(/static/image/form-1/type.svg)",
                "position": "relative",
                "font-size": "15px",
                "color": "#676767",
                "font-weight": "400",
                "border-bottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
                "background-repeat": "no-repeat",
                "background-position": "left center",
                "padding-left": "40px",
                "margin-top": "5px",
                "-webkit-transition": "all 0.30s ease-in-out",
                "-moz-transition": "all 0.30s ease-in-out",
                "-ms-transition": "all 0.30s ease-in-out",
                "-o-transition": "all 0.30s ease-in-out",
                "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
            })
        };


        return (
            <React.Fragment>
                <Select
                    styles={customStyles}
                    options={this.getList()}
                    placeholder="Select Home Type"
                    onChange={(e) => this.props.onFieldChange("homeType", e.value)}
                    value={this.getValue(this.props.value)}
                />
            </React.Fragment>
        )
    }
}