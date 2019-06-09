import React, {Component} from 'react';
import { reverse } from 'named-urls';
import routes from "routes";
import './HouseComponent.css'

export default class HouseComponent extends Component{
    render(){
        const { house: { _source } } = this.props;
        const url = reverse(routes.propertyInfo, { houseUUID: _source.uuid });
        return (
            <React.Fragment>
                <div className="col-md-4 col-lg-3">        
                    <a href={url} className="list" data-lat={_source.geo_point.lat} data-lng={_source.geo_point.lon} data-rating="#93c94c">
                        <div className="rating">
                            <img src={_source.user_image} className="rounded-circle" alt="" title="" />
                        </div>
                        <div className="image">
                            <img src={_source.thumbnail} className="w-100" alt="" title="" />
                            {_source.leased && <div className="leased-img-tag">LEASED</div>}
                        </div>
                        <h1>{_source.title}<br />{_source.home_type}</h1>
                        <h2>{_source.location}</h2>
                        <div>Min<span>{_source.min_stay}</span></div>
                        <div>Rent<span> ${_source.rent}/week</span></div>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}