import React, {Component} from "react";
import HouseComponent from './HouseComponent';

export default class SearchPageContent extends Component{
    render(){
        console.log(this.props.houses);
        return (
            <React.Fragment>
                <div className="page-map">
                    <div className="container">
                        <div className="lists">
                            <div className="row" id="search-results">
                                {this.props.houses.map((data=>{
                                    console.log(data);
                                    return <HouseComponent house={data}/>
                                }))}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}