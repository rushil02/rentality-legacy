import React, {Component} from 'react';


class Form extends Component {
    render() {
        return (
            <div className="left">
                <h1>Application for {this.props.user}’s Home </h1>
                <div className="row">
                    <div className="col-md-5">
                        <div className="input no-background top-margin">
                            <input type="text" className="form-control" placeholder="First name"/>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="Last name"/>
                        </div>
                    </div>
                    <div className="col-md-1"/>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="Email Address"/>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input type="text" className="form-control"
                                   placeholder="Phone number (Optional)"/>
                        </div>
                    </div>
                    <div className="col-md-1"/>
                    <div className="col-md-5 col-lg-5">
                        <div className="select">
                            Gender
                            <select className="form-control select-gender">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h3>Tips on what to write to Name</h3>
                <p>
                    Who are you ? are a Student ? What is your occupation ?<br/>
                    What re you like as a tenant ? Are you quiet ? Clean ? Extroved ?<br/>
                    What brings you to Canberra ?<br/>
                    What are your hobiies ?
                </p>
                <textarea className="form-control" rows="4"/>
                <h2>House Rules</h2>
                <h3>What our host chooses</h3>
                <div className="rule">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="list">
                                <h2>Smooking</h2>
                                <h3>Acceptable</h3>
                                <p>abotu the extra text being typed out under house rule</p>
                            </div>
                            <div className="list">
                                <h2>Parties&amp; Events</h2>
                                <h3>Not Acceptable</h3>
                            </div>
                            <div className="list">
                                <h2>Arrival Time</h2>
                                <h3>Between</h3>
                                <p>abotu the extra text being typed out under house rule</p>
                            </div>
                        </div>
                        <div className="col-md-2"/>
                        <div className="col-md-4">
                            <div className="list">
                                <h2>Pets</h2>
                                <h3>Not Acceptable</h3>
                            </div>
                            <div className="list">
                                <h2>Suitable for children</h2>
                                <h3>e.g : Not suitable for family</h3>
                            </div>
                            <div className="list">
                                <h2>Quiet hours</h2>
                                <h3>Flexible</h3>
                            </div>
                        </div>
                        <div className="col-md-2"/>
                    </div>
                </div>
                <p><span>Please Note :</span>By applying this home , you agreeto follow Soniya’s
                    hoem rules.</p>
                <h2>Payment</h2>
                <p><span>Please Note :</span>You will not be charget until the host approres your
                    application.</p>
                <div className="row">
                    <div className="col-md-8">
                        <div className="input no-background top-margin">
                            <input type="text" className="form-control" placeholder="Card Number"/>
                        </div>
                    </div>
                    <div className="col-md-4"/>
                    <div className="col-md-8">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="Name Surname"/>
                        </div>
                    </div>
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="Expiry Date"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="CCV"/>
                        </div>
                    </div>
                    <div className="col-md-4"/>
                </div>
                <p className="red">Card number is not correct.</p>
                <div className="checkbox auto-width">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" id="checkbox-1"
                                       className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor="checkbox-1">I
                                    agree to pay the total amount
                                    shawn and abide by the home rules</label>
                            </div>
                        </li>
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" id="checkbox-2"
                                       className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor="checkbox-2">I
                                    agree to pay the total amount
                                    shawn and abide by the home rules when
                                    the host accept my application</label>
                            </div>
                        </li>
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" id="checkbox-3"
                                       className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor="checkbox-3">I
                                    accept www.rentality.com.au s
                                    Terms e (ondition and Private Policy)
                                    and abide by the host’s home rules.</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Form;