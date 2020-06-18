import React, {Component} from "react";
import LocationSearchField from "core/UIComponents/LocationESAutosuggest/LocationSearchField";
import theme from "./LocationSearchField.module.css";

export default class SearchField extends Component {
    render() {
        return (
            <LocationSearchField
                value={this.props.value}
                onChange={this.props.onChange}
                divClass={this.props.divClass}
                theme={theme}
            />
        );
    }
}
