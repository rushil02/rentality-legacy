import React, {Component} from "react";
import HouseComponent from './HouseComponent';

export default class SearchPageContent extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="page-map">
                    <div className="container">
                        <div className="lists">
                            <div className="row" id="search-results">
                                {this.props.houses.map((data => {
                                    return <HouseComponent key={data._id} house={data}/>
                                }))}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}