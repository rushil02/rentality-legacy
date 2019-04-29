import React, {Component} from 'react';
import '../../components/application/Application.css'


export default class BookingDetailsSummary extends Component {
  render() {
    const bookingDuration = this.props.bookingDetails.bookingDuration;
    const houseImage = this.props.houseDetails.thumbnail;
    return (
      <div className="right">
        <div className="padding">
          <div className="title">
            <h1>{this.props.houseDetails.title}</h1>
            <p>{this.props.houseDetails.location}</p>
          </div>
          <img src={houseImage} className="w-100" style={{paddingBottom: "10px"}}/>
          <div className="date">
            <div className="in-out">
              <div className="row">
                <div className="col-5">
                  <div className="sub-title">Move in</div>
                  <input type="text" className="form-control" value={this.props.bookingDetails.moveIn}
                         readOnly="" data-toggle="datepicker" style={{}}/>
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
                    ${this.props.bookingDetails.weeklyRent} x {bookingDuration < 8 ? bookingDuration : (bookingDuration/ 7).toFixed(1)} weeks:
                  </div>
                  <div className="col-4 text-right bold">${this.props.bookingDetails.calculatedRent} AUD</div>
                </div>
                <div className={"row" + (!this.props.bookingDetails.discountTitle ? " bottom-margin" : "")}>
                  <div className="col-8 gray">
                    Service fee:
                    <i data-toggle="popover" data-content="Charges for Rentality's services">
                      what is this
                    </i>
                  </div>
                  <div className="col-4 text-right bold">${this.props.bookingDetails.serviceFee} AUD</div>
                </div>
                {this.props.bookingDetails.discountTitle
                  ? <div className="row bottom-margin">
                    <div className="col-8 gray">
                      {this.props.bookingDetails.discountTitle}:
                    </div>
                    <div className="col-4 text-right bold">
                      - ${this.props.bookingDetails.discountAmount} AUD
                    </div>
                  </div>
                  : null}
              </div>
            </div>
            <div className="left-padding">
              <div className="row">
                <div className="col-8 small-normal">Total</div>
                <div className="col-4 text-right red">
                  ${this.props.bookingDetails.totalRent} AUD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
