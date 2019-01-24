import React, {Component} from 'react';
import { render } from 'react-dom';
import { StripeProvider, injectStripe, Elements, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import './StripePayment.css';


const handleBlur = () => {
    console.log('[blur]');
};
const handleClick = () => {
    console.log('[click]');
};
const handleFocus = () => {
    console.log('[focus]');
};
const handleReady = () => {
    console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding,
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
};


class _CardForm extends React.Component {
    handleChange = (change) => {
        if (change.complete) {
            console.log("Completed");
            if (this.props.stripe) {
                this.props.stripe
                    .createToken()
                    .then((payload) => this.props.onStripePaymentTokenGenerated(payload));
            } else {
                console.log("Stripe.js hasn't loaded yet.");
            }
        }
    };

    render() {
        return (
        
            <label>
                Card details
                <CardElement
                    onBlur={handleBlur}
                    onChange={this.handleChange}
                    onFocus={handleFocus}
                    onReady={handleReady}
                    {...createOptions(this.props.fontSize)}
                />
            </label>
        );
    }
}

const CardForm = injectStripe(_CardForm);

export default class StripePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: null,
            elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
        };
        window.addEventListener('resize', () => {
            if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
                this.setState({ elementFontSize: '14px' });
            } else if (
                window.innerWidth >= 450 &&
                this.state.elementFontSize !== '18px'
            ) {
                this.setState({ elementFontSize: '18px' });
            }
        });
    };

    componentDidMount = () => {
        axios.get('/publishable_key').then(
            (result) => {
                console.log(result);
                this.setState({
                    apiKey: result.data.publishable_key
                });
            }
        )
    };

    render() {
        const {apiKey, elementFontSize} = this.state;
        if (apiKey){
            return (
                <StripeProvider apiKey={apiKey}>
                    <Elements>
                        <CardForm 
                            fontSize={elementFontSize}
                            onStripePaymentTokenGenerated={this.props.onStripePaymentTokenGenerated} 
                        />
                    </Elements>
                </StripeProvider>
            );
        }
        else{
            return null;
        }
    };
};

