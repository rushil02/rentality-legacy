import React, {Component} from 'react';
import axios from 'axios';
import {reverse} from 'named-urls';
import routes from "routes";
import {debounce} from 'lodash';
import PostalCodeAutoSuggestComponent from "./PostalCodeAutoSuggest";
import {alertUser} from 'core/alert/Alert';

const defaultVerboseDisplay = "Enter Postal code to select Suburb, City, State";

export default class PostalCodeAutoSuggest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            verbose: defaultVerboseDisplay,
            objID: '',
            suggestions: [],
            error: this.props.error
        };

        this.debouncedFetchSuggestions = debounce(this.onSuggestionsFetchRequested, 500, {trailing: true});
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue,
            verbose: defaultVerboseDisplay,
            objID: ''
        });
    };

    onSuggestionsFetchRequested = ({value}) => {
        axios.get(reverse(routes.cities.postalCodeVerbose), {params: {query: value}})
            .then(result => {
                if (result.data.length === 0) {
                    this.setState({
                        error: "Invalid Postal Code"
                    });
                } else {
                    this.setState({
                        error: ""
                    });
                }
                this.setState({
                    suggestions: result.data,
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
            verbose: suggestion.name_full,
            value: suggestion.code,
            objID: suggestion.id
        });
        this.props.onFieldChange('postalCode', suggestion.id);
    };

    render() {
        return (
            <PostalCodeAutoSuggestComponent
                onChange={this.onChange}
                value={this.state.value}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.debouncedFetchSuggestions}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                verbose={this.state.verbose}
                error={this.state.error}
            />
        );
    }
}


