import React, {Component} from 'react';

export default class BookingDetailsSummary extends Component {
  render() {
    const bookingDuration = this.props.bookingDetails.bookingDuration;
    return (
      <div className="right">
        <div className="column">
          <div className="left">
            <span>Move in</span><br/>
            {this.props.bookingDetails.moveIn}
          </div>
          <div className="col-2 center-arrow"/>
          <div className="right">
            <span>Move out</span><br/>
            {this.props.bookingDetails.moveOut}
          </div>
        </div>
        <div className="column no-background">
          <div className="left">
            {this.props.bookingDetails.guests === 1 ? "Guest" : "Guests"}
          </div>
          <div className="right">
            {this.props.bookingDetails.guests}
          </div>
        </div>
        <div className="column no-background">
          <div className="left">
            Room Type
            <p>Home Type {this.props.houseDetails.homeType}</p>
          </div>
        </div>
        <div className="column no-background">
          <div className="left">
            Cancellation Policy
            <p>
              {this.props.houseDetails.cancellationPolicy}
              <i data-toggle="popover" data-content="The insurance policy for your stay"> what is this</i>
            </p>
          </div>
        </div>
        <div className="column no-background no-border">
          <div className="left">
            Price
          </div>
          <div className="right">
            ${this.props.bookingDetails.discount
            ? this.props.bookingDetails.totalRent - this.props.bookingDetails.discountSavings
            : this.props.bookingDetails.totalRent} AUD
          </div>
        </div>
        <div className="col-12">
          <div className="button">
            <a href="#" onClick={this.props.onViewInvoice}>View Invoice</a>
            {/*<a href="#" onClick={this.props.onMessageHost}>Message Host</a>*/}
          </div>
        </div>
      </div>
    );
  }
}
