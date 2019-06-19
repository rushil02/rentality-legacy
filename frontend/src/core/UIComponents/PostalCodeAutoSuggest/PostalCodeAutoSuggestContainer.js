import React, {Component} from 'react';
import {debounce} from 'lodash';
import PostalCodeAutoSuggestComponent from "./PostalCodeAutoSuggestComponent";
import {alertUser} from 'core/alert/Alert';
import {getPostalCodeData, getPostalCodeSuggestions} from "./services";

const defaultVerboseDisplay = "Enter Postal code to select Suburb, City, State";


export default class PostalCodeAutoSuggest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            verbose: defaultVerboseDisplay,
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
        getPostalCodeData(this.props.objID)
            .then(result => {
                this.setState({
                    verbose: result.name_full,
                    value: result.code,
                    objID: result.id,
                });
            })
            .catch(
                error => alertUser.init({stockAlertType: "connectionError"})
            )
    };

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue,
            verbose: defaultVerboseDisplay,
        });
        this.props.onFieldChange('postalCodeID', '');
    };

    onSuggestionsFetchRequested = ({value}) => {
        getPostalCodeSuggestions(value)
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
            verbose: suggestion.name_full,
            value: suggestion.code,
            objID: suggestion.id
        });
        this.props.onFieldChange('postalCodeID', suggestion.id);
    };

    render() {
        return (
            <PostalCodeAutoSuggestComponent
                onChange={this.onChange}
                theme={this.props.theme}
                value={this.state.value}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.debouncedFetchSuggestions}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                verbose={this.state.verbose}
                errors={this.state.errors.concat(this.props.errors)}
            />
        );
    }
}


