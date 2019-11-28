import React from 'react';
import ScriptLoader from 'react-script-loader-hoc';
import {StripeProvider, Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import {ComponentLoadingSpinner} from "core/loadingSpinners/LoadingSpinner";


const StripePayment = ({scriptsLoadedSuccessfully}) => {
    if (!scriptsLoadedSuccessfully) return <ComponentLoadingSpinner/>;

    return (
        <StripeProvider apiKey="pk_test_12345">
            <Elements>
                <CheckoutForm/>
            </Elements>
        </StripeProvider>
    );
};

export default ScriptLoader('https://js.stripe.com/v3/')(StripePayment);
