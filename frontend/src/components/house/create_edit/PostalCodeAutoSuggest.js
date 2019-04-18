import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import './PostalCodeAutoSuggest.css';

function getSuggestionValue(suggestion) {
    return suggestion.code;
}

const renderSuggestion = suggestion => (
    <div>
        {suggestion.code + '\u00A0\u00A0\u00A0\u00A0\u00A0' + suggestion.name_full}
    </div>
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
            type: 'number',
        };

        return (
            <React.Fragment>
                <div className="col-md-3">
                    <Autosuggest
                        id="location"
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
                        <div id="location-verbose" className="form-control no-background">
                            {this.props.verbose}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <small className="form-text text-muted">
                    </small>
                    {this.props.error &&
                    <div className="invalid-feedback">{this.props.error}</div>
                    }
                </div>
            </React.Fragment>
        )
    }
}