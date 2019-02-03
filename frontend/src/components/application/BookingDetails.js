import React, {Component} from 'react';

export default class BookingDetails extends Component {
  render() {
    const bookingDuration = this.props.bookingAmountDetails.bookingDuration;
    return (
      <div className="right">
        <div className="padding">
          <div className="title">
            <h1>{this.props.houseDetails.title}</h1>
            <p>{this.props.houseDetails.location}</p>
          </div>
          <div className="date">
            <div className="in-out">
              <div className="row">
                <div className="col-5">
                  <div className="sub-title">Move in</div>
                  <input type="text" className="form-control" value={this.props.bookingDetails.moveIn}
                  readOnly="" data-toggle="datepicker"/>
                </div>
                <div className="col-2 center-arrow"/>
                <div className="col-5">
                  <div className="sub-title text-right">Move out</div>
                  <input type="text" className="form-control text-right"
                  value={this.props.bookingDetails.moveOut} readOnly="" data-toggle="datepicker"/>
                </div>
              </div>
            </div>
          </div>
          <div className="quest">
            <div className="row">
              <div className="col-8">
                <div className="title">{this.props.bookingDetails.guests === 1 ? "Guest" : "Guests"}</div>
              </div>
              <div className="col-4">
                <div className="input">
                  <input type="text" className="form-control" value={this.props.bookingDetails.guests}/>
                </div>
              </div>
            </div>
          </div>
          <div className="list">
            <h2>Room Type</h2>
            <p>{this.props.houseDetails.homeType}</p>
            <h2>Cancellation Policy</h2>
            <p>
              {this.props.houseDetails.cancellationPolicy.verbose}
              <i data-toggle="popover" data-content={this.props.houseDetails.cancellationPolicy.description}>
                what is this
              </i>
            </p>
          </div>
          <div className="amount">
            <div className="calculate">
              <div className="left-padding">
                <div className="row">
                  <div className="col-8 gray">
                    Weekly Rent:
                  </div>
                  <div className="col-4 text-right bold">${this.props.bookingAmountDetails.weeklyRent} AUD</div>
                </div>
                <div className="row">
                  <div className="col-8 gray">
                    ${this.props.bookingAmountDetails.weeklyRent} x {parseFloat(bookingDuration).toFixed(1)} weeks:
                  </div>
                  <div className="col-4 text-right bold">${this.props.bookingAmountDetails.totalRent} AUD</div>
                </div>
                <div className="row">
                  <div className="col-8 gray">
                    Service fee:
                    <i data-toggle="popover" data-content="Charges for Rentality's services">
                      what is this
                    </i>
                  </div>
                  <div className="col-4 text-right bold">${this.props.bookingAmountDetails.serviceFee} AUD</div>

                </div>

                <div className={"row" + (!this.props.discountCodes ? " bottom-margin" : "")}>
                  <div className="col-8 gray">
                    Total Amount Payable:
                    <i data-toggle="popover" data-content="Only first month's rent is accepted by rentality as booking fees.">
                      what is this
                    </i>
                  </div>
                  <div className="col-4 text-right bold">${this.props.bookingAmountDetails.totalPayable} AUD</div>
                </div>
                {this.props.discountCodes && this.props.discountCodes.map((code, index) => {
                  return <div className="row bottom-margin">
                            <div className="col-8 gray">
                              {code.description}:
                    </div>
                            {index === this.props.discountCodes.length - 1 &&
                              <div className="col-8 gray">
                                {this.props.bookingAmountDetails.discountAmount}:
                      </div>}
                          </div>;
                })}
              </div>
              <div className="form">
                <div className="row">
                  <div className="col-8">
                    <input type="text" className="form-control"
                           placeholder="Discount Code"
                           value={this.props.discountCode}
                           onChange={(value) => this.props.onDiscountFieldChange(value.target.value)}/>
                  </div>
                  <div className="col-4" style={{paddingTop: "10px"}}>
                    <button type="button"
                            className="btn btn-link btn-block"
                            onClick={() => this.props.onApplyDiscount(this.props.discountCode)}>
                            Apply code
                    </button>
                  </div>
                </div>
                {this.props.errors.discountCode && <div style={{color: "red", fontSize: 12}}>{this.props.errors.discountCode}</div>}
              </div>
            </div>
            <div className="left-padding">
              <div className="row">
                <div className="col-8 small-normal">Total</div>
                <div className="col-4 text-right red">
                  ${this.props.bookingAmountDetails.totalPayable} AUD
                </div>
              </div>
            </div>
            <p className="last-p">
              Please Note: You are not required to pay until the
              host approves your application
            </p>
          </div>
        </div>
      </div>
    );
  }
}
