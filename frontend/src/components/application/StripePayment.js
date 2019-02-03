import React, {Component} from 'react';
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

  //FIXME: on submit rather than on change; File Review required @Elliott
  sendStripeRequest = () => {
    if (this.props.stripe) {
      this.props.stripe.createToken()
        .then((resp) => {
          if (resp.token) {
            this.props.onStripePaymentTokenGenerated(resp.token.id);
            this.props.onPaymentFieldChange("stripeToken", resp.token.id);
          }
        });

    } else {
    }
  };

  render() {
    return (

      <label>
        <h2>Payment Details</h2>
        <p>Please Note: You will not be charged until the host approves your
          application.</p>
        <CardElement
          onBlur={this.sendStripeRequest}
          {...createOptions(this.props.fontSize)}
        />
        {this.props.errors.stripeToken && <div style={{color: 'red'}}>The payment details you entered are invalid</div>}
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
        <div>
          <StripeProvider apiKey={apiKey}>
            <Elements>
              <CardForm
                fontSize={elementFontSize}
                onStripePaymentTokenGenerated={this.props.onStripePaymentTokenGenerated}
                onPaymentFieldChange={this.props.onPaymentFieldChange}
                errors={this.props.errors}/>
            </Elements>
          </StripeProvider>
        </div>
      );
    }
    else {
      return null;
    }
  };
};

