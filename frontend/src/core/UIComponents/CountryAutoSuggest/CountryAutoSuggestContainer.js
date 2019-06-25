import React, {Component} from 'react';
import {debounce} from "lodash";
import {getCountryData, getCountrySuggestions} from "./services";
import {alertUser} from "core/alert/Alert";
import Autosuggest from "react-autosuggest";
import theme from "./CountryAutoSuggest.css";


function getSuggestionValue(suggestion) {
    return suggestion.name;
}

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);


export default class CountryAutoSuggestContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            errors: [],
            objID: '',
        };

        this.debouncedFetchSuggestions = debounce(this.onSuggestionsFetchRequested, 350, {trailing: true});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.objID) {
            if (this.props.objID !== this.state.objID) {
                this.updateDisplay();
            }
        }
    }

    componentDidMount() {
        if (this.props.objID) {
            this.updateDisplay();
        }
    }

    updateDisplay = () => {
        getCountryData(this.props.objID)
            .then(result => {
                this.setState({
                    value: result.name,
                    objID: result.id,
                });
                if (this.props.hasOwnProperty('updateInfo')) {
                    this.props.updateInfo(result)
                }
            })
            .catch(
                error => alertUser.init({stockAlertType: "connectionError"})
            )
    };

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue,
        });
        this.props.onFieldChange('');
    };

    onSuggestionsFetchRequested = ({value}) => {
        getCountrySuggestions(value)
            .then(result => {
                if (result.length === 0) {
                    this.setState({
                        errors: ["Invalid Postal Code"]
                    });
                } else {
                    this.setState({
                        errors: []
                    });
                }
                this.setState({
                    suggestions: result,
                });
            })
            .catch(
                error => alertUser.init({stockAlertType: "connectionError"})
            )
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, {suggestion}) => {
        this.setState({
            value: suggestion.name,
            objID: suggestion.id
        });
        this.props.onFieldChange(suggestion.id);
        if (this.props.hasOwnProperty('updateInfo')) {
            this.props.updateInfo(suggestion)
        }
    };

    render() {
        const inputProps = {
            placeholder: "Country",
            value: this.state.value,
            onChange: this.onChange,
            type: 'text',
            autoComplete: 'Mlep(clay)nos',
        };

        let errorDisp = [];
        for (let i = 0; i < this.props.errors.length; i++) {
            errorDisp.push(<div key={i} className="invalid-feedback">{this.state.errors[i]}</div>)
        }

        return (
            <React.Fragment>
                <div className="col-12">
                    <Autosuggest
                        id="country"
                        theme={{...theme, ...this.props.theme}}
                        highlightFirstSuggestion={true}
                        focusInputOnSuggestionClick={false}
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.debouncedFetchSuggestions}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                    <small className="form-text text-muted">
                    </small>
                    {errorDisp}
                </div>
            </React.Fragment>
        );
    }
}