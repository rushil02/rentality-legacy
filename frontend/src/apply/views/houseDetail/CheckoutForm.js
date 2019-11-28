import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
// import "./CheckoutForm.css";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const wrapperStyle = {
            boxShadow: "0 1px 3px 0 rgba(50, 50, 93, 0.15), 0 4px 6px 0 rgba(112, 157, 199, 0.15)",
            padding: "10px 15px",
            margin: "20px 0",
            background: "#fff",
            fontSize: "1px",
            border: "none",
            borderRadius: "4px",
        };

        const elementStyle = {
            base: {
                fontSize: "16px"
            }
        };
        return (
            <div style={wrapperStyle}>
                <CardElement style={elementStyle}/>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
