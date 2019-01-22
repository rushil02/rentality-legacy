import React, {Component} from 'react';

class DetailsComponent extends Component {
    constructor(props){
        super(props);
        // this.state = {data: this.props.data};
        console.log(this.props.data, "asd")
    }

    render() {
        if(!this.props.data){
            console.log("kkk");
            return(null);
        }
        return (
            <div className="right">
                <div className="gallery">
                    <div className="loop owl-carousel owl-theme">
                        <h1>Hello world</h1>
                    </div>
                </div>
                <div className="padding">
                    <div className="title">
                        {/*<h1>{this.props.applyData.house.title}</h1>*/}
                        {/*<p>{this.props.applyData.house.location}</p>*/}
                    </div>
                    <div className="date">
                        <div className="in-out">
                            <div className="row">
                                <div className="col-5">
                                    <div className="sub-title">Move in</div>
                                    {/*<input type="text" className="form-control" value="Oct 22 2018"*/}
                                           {/*readOnly="" data-toggle="datepicker"/>*/}
                                </div>
                                <div className="col-2 center-arrow"/>
                                <div className="col-5">
                                    <div className="sub-title text-right">Move out</div>
                                    {/*<input type="text" className="form-control text-right"*/}
                                           {/*value="Oct 22 2018" readOnly="" data-toggle="datepicker"/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="quest">
                        <div className="row">
                            <div className="col-8">
                                <div className="title">Quest</div>
                            </div>
                            <div className="col-4">
                                <div className="input">
                                    {/*<input type="text" className="form-control" value="2"/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        <h2>Room Type</h2>
                        <p>Room in a share home with private toliet</p>
                        <h2>House Rules</h2>
                        <p>Read soniya’s rules</p>
                        <h2>Cancellation Policy</h2>
                        <p>Moderate<i data-toggle="popover"
                                      data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">what
                            is this</i></p>
                    </div>
                    <div className="amount">
                        <div className="calculate">
                            <div className="left-padding">
                                <div className="row">
                                    <div className="col-8 gray">$200 x 4 weeks:</div>
                                    <div className="col-4 text-right bold">$800 AUD</div>
                                </div>
                                <div className="row bottom-margin">
                                    <div className="col-8 gray">Service fee:<i data-toggle="popover"
                                                                               data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">what
                                        is this</i>
                                    </div>
                                    <div className="col-4 text-right bold">$48 AUD</div>
                                </div>
                            </div>
                            <div className="form">
                                <div className="row">
                                    <div className="col-8">
                                        <input type="text" className="form-control"
                                               placeholder="Discount Code"/>
                                    </div>
                                    <div className="col-4">
                                        <button type="button"
                                                className="btn btn-link btn-block">Apply code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="left-padding">
                            <div className="row">
                                <div className="col-8 small-normal">Total</div>
                                <div className="col-4 text-right red">$848 AUD</div>
                            </div>
                        </div>
                        <p className="last-p">
                            Please Note: you are not required to pay until the
                            host approve your application
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsComponent;