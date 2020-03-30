import React, {Component} from "react";
import Autosuggest from "react-autosuggest";
import theme from "./PostalCodeAutoSuggest.css";

function getSuggestionValue(suggestion) {
    return suggestion.code;
}

const renderSuggestion = (suggestion) => (
    <div>{suggestion.code + "\u00A0\u00A0\u00A0\u00A0\u00A0" + suggestion.name_full}</div>
);

export default class PostalCodeAutoSuggestComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const inputProps = {
            placeholder: "Postal Code",
            value: this.props.value,
            onChange: this.props.onChange,
            type: "text",
            autoComplete: "off",
        };

        let errorDisp = [];
        for (let i = 0; i < this.props.errors.length; i++) {
            errorDisp.push(
                <div key={i} className="invalid-feedback">
                    {this.props.errors[i]}
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="col-md-3">
                    <Autosuggest
                        id="location"
                        theme={{...theme, ...this.props.theme}}
                        highlightFirstSuggestion={true}
                        focusInputOnSuggestionClick={false}
                        suggestions={this.props.suggestions}
                        onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
                        onSuggestionSelected={this.props.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
                <div className="col-md-9">
                    <div className="input">
                        <div id="location-verbose" className="form-control no-background readonly-custom-input">
                            {this.props.verbose}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <small className="form-text text-muted"></small>
                    {errorDisp}
                </div>
            </React.Fragment>
        );
    }
}
