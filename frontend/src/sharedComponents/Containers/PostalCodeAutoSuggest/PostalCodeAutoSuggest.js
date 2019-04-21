import React, {Component} from 'react';
import axios from 'axios';
import {reverse} from 'named-urls';
import routes from "routes";
import {debounce} from 'lodash';
import PostalCodeAutoSuggestComponent from "sharedComponents/Components/PostalCodeAutoSuggest/PostalCodeAutoSuggest";
import {alertUser} from 'containers/common/Alert';

const defaultVerboseDisplay = "Enter Postal code to select Suburb, City, State";

export default class PostalCodeAutoSuggest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            verbose: defaultVerboseDisplay,
            objID: this.props.objID || '',
            suggestions: [],
            error: this.props.error,
            fullWidth: this.props.fullWidth
        };

        this.debouncedFetchSuggestions = debounce(this.onSuggestionsFetchRequested, 500, {trailing: true});
    }

    getVerbose = (code) => {
        this.setState({
            value: code
        });
    }

    static getDerivedStateFromProps(props, state) {
        /**
         * This will update the state of the component when new porps are passed from the parent
         */
         return {'objID': props.objID}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.objID !== this.state.objID) {
            axios.get(reverse(routes.cities.postalCodeDetails, {objID: this.state.objID}), {})
                .then(result => {
                    this.setState({
                        verbose: result.data.name_full,
                        value: result.data.code,
                        objID: result.data.id,
                        error: ""
                    });
                })
                .catch(
                    error => {
                        return alertUser.init({ stockAlertType: "connectionError" });
                    }
                );
        }
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
        this.props.onFieldChange(this.props.datakey, suggestion.id);
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
                fullWidth={this.state.fullWidth}
            />
        );
    }
}
