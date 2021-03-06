import React, {Component} from 'react';
import { reverse } from 'named-urls';
import {PageRoutes} from "components/routes";
import styles from './HouseComponent.module.css';

export default class HouseComponent extends Component{
    render(){
        let house = this.props.house;
        const url = reverse(PageRoutes.apply.houseInfo, { houseUUID: house.getData('uuid') });
        return (
            <React.Fragment>
                <div className="col-md-4 col-lg-3">        
                    <a href={url} className={styles.list} data-lat='{_source.geo_point.lat}' data-lng='{_source.geo_point.lon}' data-rating="#93c94c">
                        <div className={styles.rating}>
                            <img src={house.getData('userImage')} className="rounded-circle" alt="" title="" />
                        </div>
                        <div className={styles.image}>
                            <img src={house.getData('thumbnail')} className="w-100" alt="" title="" />
                            {house.getData('leased') && <div className={styles.leasedImgTag}>LEASED</div>}
                        </div>
                        <h1>{house.getData('title')}<br />{house.getData('homeType')}</h1>
                        <h2>{house.getData('location')}</h2>
                        <div>Min<span>{house.getData('minStay')}</span></div>
                        <div>Rent<span> ${house.getData('rent')}/week</span></div>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}