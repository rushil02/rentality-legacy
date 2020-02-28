import React, {Component} from 'react';
// import {CardElement, injectStripe} from 'react-stripe-elements';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

import styles from "./CheckoutForm.css";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
    }

    // handleSubmit = async (event) => {
    //
    //     const {stripe, elements} = this.props;
    //
    //     if (!stripe || !elements) {
    //         return;
    //     }
    //
    //     // Get intent details
    //     // const intent = await
    //     const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
    //         payment_method: {
    //             card: elements.getElement(CardElement),
    //             billing_details: {
    //                 name: 'Jenny Rosen',
    //             },
    //         }
    //     });
    //
    //     if (result.error) {
    //         // Show error to your customer (e.g., insufficient funds)
    //         console.log(result.error.message);
    //     } else {
    //         // The payment has been processed!
    //         if (result.paymentIntent.status === 'succeeded') {
    //             // Show a success message to your customer
    //             // There's a risk of the customer closing the window before callback
    //             // execution. Set up a webhook or plugin to listen for the
    //             // payment_intent.succeeded event that handles any business critical
    //             // post-payment actions.
    //         }
    //     }
    // };

    submit = (name) => {
        // TODO: hit URL intent

        let data = {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        };

        this.props.stripe.confirmCardPayment('{CLIENT_SECRET}', data)
            .then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            });

        console.log("Purchase Complete!")
    };

    componentDidUpdate(prevProps) {
        if (this.props.requestForToken && this.props.requestForToken !== prevProps.requestForToken) {
            this.submit(this.props.name);
        }
    }

    render() {

        const CARD_ELEMENT_OPTIONS = {
            style: {
                base: {
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#aab7c4",
                    },
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                },
            },
        };

        return (
            <div className={styles.wrapper}>
                <CardElement options={CARD_ELEMENT_OPTIONS}/>
            </div>
        );
    }
}

function getLoadStatus(stripe, elements) {
    if (!stripe || !elements) {
        return "loading"
    } else {
        return "done"
    }
}

export default function () {
    return (
        <ElementsConsumer>
            {({stripe, elements}) => {
                return (
                    <RequestErrorBoundary status={getLoadStatus(stripe, elements)}>
                        <CheckoutForm stripe={stripe} elements={elements}/>
                    </RequestErrorBoundary>
                )
            }}
        </ElementsConsumer>
    );
}