import React from 'react';
import ScriptLoader from 'react-script-loader-hoc';
import {StripeProvider, Elements} from 'react-stripe-elements';
import {LoadIcon, CheckoutForm} from '../components';

const StripePayment = ({scriptsLoadedSuccessfully}) => {
    if (!scriptsLoadedSuccessfully) return <LoadIcon/>;

    return (
        <StripeProvider apiKey="pk_test_12345">
            <Elements>
                <CheckoutForm/>
            </Elements>
        </StripeProvider>
    );
};

export default ScriptLoader('https://js.stripe.com/v3/')(StripePayment);