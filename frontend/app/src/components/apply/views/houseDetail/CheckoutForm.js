import React, { Component } from "react"
// import {CardElement, injectStripe} from 'react-stripe-elements';
import { CardElement } from "@stripe/react-stripe-js"

import styles from "./CheckoutForm.module.css"

export default class CheckoutForm extends Component {
    constructor(props) {
        super(props)
    }

    submit = () => {
        let data = {
            payment_method: {
                card: this.props.elements.getElement(CardElement),
                billing_details: {
                    name: this.props.name,
                },
            },
        }

        return this.props.stripe.confirmCardPayment(this.props.clientSecret, data)

        // this.props.stripe
        //     .confirmCardPayment(this.props.clientSecret, data)
        //     .then(result => {
        //         console.log(result);
        //         if (result.error) {
        //             // Show error to your customer (e.g., insufficient funds)
        //             // close modal
        //             // use alert
        //             console.log(result.error.message);
        //         } else {
        //             if (result.paymentIntent.status === "succeeded") {
        //                 //Redirect to success page
        //                 console.log("Hurray");
        //             }
        //         }
        //         return result;
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    componentDidUpdate(prevProps) {
        // if (this.props.requestForToken && this.props.requestForToken !== prevProps.requestForToken) {
        //     this.submit(this.props.name);
        // }
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
        }

        return (
            <div className={styles.wrapper}>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
        )
    }
}

// export default function() {
//     return (
//         <ElementsConsumer>
//             {({ stripe, elements }) => {
//                 return (
//                     <RequestErrorBoundary
//                         status={getLoadStatus(stripe, elements)}
//                     >
//                         <CheckoutForm stripe={stripe} elements={elements} />
//                     </RequestErrorBoundary>
//                 );
//             }}
//         </ElementsConsumer>
//     );
// }
