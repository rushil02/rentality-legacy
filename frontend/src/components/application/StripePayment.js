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
  constructor(props) {
    super(props);
    this.state = {
      stripeRequest: true
    }
  }

  //FIXME: on submit rather than on change; File Review required @Elliott
  sendStripeRequest = () => {
    if (this.props.stripe) {
      console.log("Stripe object not null");
      this.props.stripe.createToken()
        .then((resp) => {
          if (resp.token) {
            this.props.onStripePaymentTokenGenerated(resp.token.id);
            this.setState({stripeRequest: true});
            console.log("RESP", resp)
          } else {
            this.setState({stripeRequest: false});
            console.log("NO TOKEN", !this.props.stripeRequest)
          }
        });

    } else {
      console.log("Stripe.js hasn't loaded yet.");
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
        {!this.state.stripeRequest
          ? <div style={{color: 'red'}}>The payment details you entered are invalid</div>
          : null
        }
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
      stripeRequest: true,
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
    const {apiKey, elementFontSize, stripeRequest} = this.state;
    if (apiKey){
      return (
        <div>
          <StripeProvider apiKey={apiKey}>
            <Elements>
              <CardForm
                fontSize={elementFontSize}
                onStripePaymentTokenGenerated={this.props.onStripePaymentTokenGenerated}/>
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

