import React, {Component} from 'react';
import styles from "./App.css";
import {reverse} from "named-urls";
import routes from "routes";


function GetHouseListing(props){
    let house = props.house;

    return(
        <div className={styles.board}>
            <div className="row">
                <div className="col-md-3">
                    <div className="image">
                        <img src="/static/image/page-dashboard/1.png" className="w-100" alt="" title=""/>
                    </div>
                </div>
                <div className="col-md-9">
                   <div className="row">
                        <div className={"col-md-8 "+ styles.info}>
                            <h1>{house.getData('title')}</h1>
                            <h2>{house.getData('houseNum')}, {house.getData('streetName')}</h2>
                            <h2>{house.getData('location')}</h2>
                            <p>{house.getData('homeType')}</p>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.amount}>
                                $ {house.getData('rent')} AUD
                                <p>{house.getData('cancellationPolicy')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                        <div className={styles.confirm}>
                                    <button className={styles.btn + " btn-link"}>{house.getData('status')}</button>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className={styles.detail}>
                                <a className={styles.btn + " btn-link"} href={reverse(routes.react.houseListing.edit, {houseUUID: house.getData('uuid')})}>Manage</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default class AppComponent extends Component {

    render(){
        return(
            <React.Fragment>
                <div className={styles.pageDashboard}>
                    <div className="container">
                        <h1>Dashboard</h1>
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xl-12">
                                <h2>Property Listing </h2>
                                {this.props.houses.getObjectList().map((house, index) =>  <GetHouseListing key={house[0]} house={house[1]}/>)}
                                <h2>Bookings </h2>
                                <div className={styles.board}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="image">
                                                <img src="/static/image/page-dashboard/1.png" className="w-100" alt="" title=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className={styles.date}>
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <div className={styles.dateSubtitle + " text-left"}>Move in</div>
                                                                <div className={styles.dateDisplay + " text-left"}>Oct 22, 2018</div>
                                                            </div>
                                                            <div className={"col-2 " + styles.centerArrow}/>
                                                            <div className="col-5">
                                                                <div className={styles.dateSubtitle + " text-right"}>Move out</div>
                                                                <div className={styles.dateDisplay + " text-right"}>Nov 28, 2018</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className={styles.amount}>
                                                        $860 AUD
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h1>La Salentina, sea, nature & relax</h1>
                                                    <h2>Capital Territory, Australia Love Street No 322 </h2>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                        tempor
                                                        incididunt ut labore et dolore magna aliqua.</p>
                                                    <div className={styles.confirm}>
                                                        <button className={styles.btn + " btn-link"}>Confirmed</button>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul className={styles.listUnstyled}>
                                                        <li><a href="">View invoice</a></li>
                                                        <li><a href="">Message Host</a></li>
                                                        <li><a href="">View guest's itinerary</a></li>
                                                        <li><a href="">Change/Cancel reservation</a></li>
                                                        <li><a href="">View house rule</a></li>
                                                    </ul>
                                                    <div className={styles.detail}>
                                                        <button className={styles.btn + " btn-link"}>Detail</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
        
    }
}