import React, {Component} from "react";
import Autosuggest from "react-autosuggest";
import {getLocationSuggestions} from "./services";
import {debounce} from "lodash";
import {LocationSearchModel} from "./models";
import {APIModelListAdapter} from "core/utils/ModelHelper";

function getSuggestionValue(suggestion) {
    return suggestion.getData("verbose");
}

const renderSuggestion = (suggestion) => {
    return (
        <div>
            <strong>{getSuggestionValue(suggestion)}</strong> {suggestion.getData("parent_verbose")}
        </div>
    );
};

export default class PostalCodeSearchField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: new APIModelListAdapter([], LocationSearchModel, "_id", "empty"),
        };
        this.debouncedFetchSuggestions = debounce(this.onSuggestionsFetchRequested, 350, {trailing: true});
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: new APIModelListAdapter([], LocationSearchModel, "_id", "empty"),
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        // this.setState({
        //     suggestions: getSuggestions(value)
        // });
        getLocationSuggestions(value)
            .then((data) => {
                this.setState({
                    suggestions: new APIModelListAdapter(data, LocationSearchModel, "_id", "saved"),
                });
            })

            .catch((error) => {
                console.log(error);
            });
    };

    onSuggestionSelected = (e, {suggestion}) => {
        e.preventDefault();
        this.props.onChange("locationSuggestion", suggestion.getData("id"));
        this.props.onChange("location", suggestion.getData("verbose"));
    };

    render() {
        let suggestionObjects = this.state.suggestions.getList();
        const inputProps = {
            placeholder: "City, State, Postal Code",
            value: this.props.value,
            onChange: (e) => {
                e.preventDefault();
                this.props.onChange("location", e.target.value);
            },
            type: "text",
        };
        console.log("In render", this.props.value);

        return (
            <React.Fragment>
                <div className={this.props.divClass || ""}>
                    <Autosuggest
                        // id="location"
                        suggestions={suggestionObjects}
                        onSuggestionsFetchRequested={this.debouncedFetchSuggestions}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        theme={this.props.theme || ""}
                    />
                </div>
            </React.Fragment>
        );
    }
}
