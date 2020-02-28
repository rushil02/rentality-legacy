import React, {Component} from 'react';
import CheckoutForm from './CheckoutForm';
import {ComponentLoadingSpinner} from "core/loadingSpinners/LoadingSpinner";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';


const stripePromise = loadStripe("pk_test_E6FOPoFqc8KdUgFgiYzwzQRy");

export default class PaymentPanel extends Component {
    constructor(props) {
        super(props);
        this.stripePromise = null;
    }

    // componentDidMount() {
    //     const stripePromise = loadStripe("pk_test_E6FOPoFqc8KdUgFgiYzwzQRy");
    // }


    render() {
        return (
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        );
    }

}
