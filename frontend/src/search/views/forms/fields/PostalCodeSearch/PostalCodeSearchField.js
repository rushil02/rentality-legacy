import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import { getPostalCodeSuggestions } from 'search/services';
import './PostalCodeSearchField.css';

function getSuggestionValue(suggestion) {
    console.log(suggestion);
    return suggestion._source.verbose;
}


const renderSuggestion = suggestion => {
    return (
        <div>
            <strong>{suggestion._source.verbose}</strong> {suggestion._source.parent_verbose}
        </div>
    )
};


export default class PostalCodeSearchField extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            suggestions: []
        };
    }

    onChange(e, {newValue}){
        this.setState({
            value: newValue
        });
        this.props.onValueChange(newValue);
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        // this.setState({
        //     suggestions: getSuggestions(value)
        // });
        getPostalCodeSuggestions().then((data) => {
            this.setState({
                suggestions: data
            });}
        );
    };

    onSuggestionSelected = (event, { suggestion }) => {
        // this.props.onFieldChange('postalCodeID', suggestion.id);
        console.log(event, suggestion);
        this.props.onChange(suggestion);
    };

    render(){
        const inputProps = {
            placeholder: "City, State, Postal Code",
            value: this.state.value,
            onChange: this.onChange.bind(this),
            type: 'text',
        };

        return (
            <React.Fragment>
                <Autosuggest
                    id="location"
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </React.Fragment>
        );
    }
}