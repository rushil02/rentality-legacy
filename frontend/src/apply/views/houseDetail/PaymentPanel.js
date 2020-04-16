import React, {Component} from "react";
import CheckoutForm from "./CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, ElementsConsumer} from "@stripe/react-stripe-js";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";
import {SecretContext} from "./HouseDetailPage";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

function getLoadStatus(stripe, elements) {
    if (!stripe || !elements) {
        return "loading";
    } else {
        return "done";
    }
}

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
                <ElementsConsumer>
                    {({stripe, elements}) => {
                        return (
                            <RequestErrorBoundary status={getLoadStatus(stripe, elements)}>
                                <SecretContext.Consumer>
                                    {(clientSecret) => (
                                        <CheckoutForm
                                            stripe={stripe}
                                            elements={elements}
                                            name={this.props.name}
                                            ref={this.props.checkoutFormRef}
                                            clientSecret={clientSecret}
                                        />
                                    )}
                                </SecretContext.Consumer>
                            </RequestErrorBoundary>
                        );
                    }}
                </ElementsConsumer>
            </Elements>
        );
    }
}
