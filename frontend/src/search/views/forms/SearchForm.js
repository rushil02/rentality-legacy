import React, { Component } from "react";
import routes from 'routes'
import PostalCodeSearchField from "./fields/PostalCodeSearch/PostalCodeSearchField";
import DateInput from "./fields/DateInput/DateInput";
import HouseType from "./fields/HouseType/HouseType";
import Rent from './fields/Rent';   
import './SearchForm.css'


export default class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            rent: null,
            location: '',
            loc_sugg: '',
            home_type: null,
            ...this.props.params,
        }
    }

    onRentChanged = (e, value) => {
        this.setState({
            rent: e.target.value
        });
    };

    onHouseTypeChanged = (e) => {
        this.setState({
            home_type: e.target.value
        });
    };

    onPostalCodeSuggestionChanged = (suggestion) => {
        this.setState({
            location_sugg: suggestion._id
        });
    };

    onPostalCodeValueChanged = (value) => {
        this.setState({
            location: value
        });
    };

    onDateRangeChange = (startDate, endDate) => {
        this.setState({
            start_date: startDate,
            end_date: endDate
        });
    };

    render(){
        return (
            <React.Fragment>
                <div className="page-map-filter position-sticky sticky-top">
                    <div className="container">
                        <form id="search_form" autoComplete="off">
                            
                            <div className="row">
                                
                                <PostalCodeSearchField value={this.state.location} onChange={this.onPostalCodeSuggestionChanged} onValueChange={this.onPostalCodeValueChanged}/>
                                <DateInput startDate={this.state.start_date} endDate={this.state.end_date} onChange={this.onDateRangeChange}/>
                                <HouseType value={this.state.home_type} onChange={this.onHouseTypeChanged}/>
                                <Rent value={this.state.rent} onChange={this.onRentChanged} />
                                <div className="col-md-2">    
                                    <button className="imp-button-style"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.onSearchClicked(this.state)}
                                    }>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}