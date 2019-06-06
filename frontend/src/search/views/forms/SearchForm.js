import React, { Component } from "react";
import routes from 'routes'
import PostalCodeSearchField from "./fields/PostalCodeSearch/PostalCodeSearchField";
import './SearchForm.css'


export default class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            params: this.props.params
        }
    }
    render(){
        const { location } = this.props.params;
        return (
            <React.Fragment>
                <div className="page-map-filter position-sticky sticky-top">
                    <div className="container">
                        <form id="search_form" autoComplete="off">
                            
                            <div className="row">
                                
                                <PostalCodeSearchField value={location}/>
                                <div className="col-md-3">
                                    <div>
                                        <div className="dropdown">
                                            <input type="text" className="form-control date" placeholder="Select Dates" readOnly
                                                id="placeholder-date"
                                                data-toggle="dropdown" required />
                                                <div className="dropdown-menu">
                                                    <div className="calendar"></div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    
                                </div>
                                <div className="col-md-2">
                                    
                                </div>
                                <div className="col-md-2">    
                                    <button className="btn btn-link btn-block">Search</button>
                                </div>
                            </div>
                            <div id="other-filter" className="collapse text-center">
                                ...
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}