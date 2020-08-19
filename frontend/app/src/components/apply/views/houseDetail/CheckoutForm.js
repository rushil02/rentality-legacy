import React, { Component } from "react"
import { CardElement } from "@stripe/react-stripe-js"

import styles from "./CheckoutForm.module.css"

export default class CheckoutForm extends Component {

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
