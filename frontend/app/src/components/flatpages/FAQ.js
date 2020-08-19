import React, { Component } from "react"
import styles from "./FAQ.module.css"
import { Accordion, Card, Button } from "react-bootstrap"

export default class FAQ extends Component {
    render() {
        return (
            <React.Fragment>
                {/* < !--page faq start-- > */}
                <div className={styles.faq}>
                    <div className="container-fluid">
                        <h1 className={styles.title}>FAQ</h1>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <Accordion defaultActiveKey="0">
                                    <Card bsPrefix={styles.outerCard}>
                                        <Card.Header bsPrefix={styles.outerCardHeader}>
                                            <h5 className="mb-0">
                                                <Accordion.Toggle className="btn btn-link" eventKey={0}>
                                                    Accounts &amp; Registration
                                                </Accordion.Toggle>
                                            </h5>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={0}>
                                            <Card.Body bsPrefix={styles.outerCardBody}>
                                                <Accordion defaultActiveKey="1">
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={1}>
                                                                    How do I create an account?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={1}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Select the Sign Up / Login button on the top right
                                                                    of the page. Fill in your details and verify your
                                                                    email address.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard + " " + styles.mt10}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={2}>
                                                                    How do I verify my email address ?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={2}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    After signing up, a verification email will be sent
                                                                    to your email address that was used to sign up. The
                                                                    email would contain a link to verify your Rentality
                                                                    account.
                                                                    <br />
                                                                    <br />
                                                                    After signing up, it may take a few minutes before
                                                                    your receive the verification email. Remember to
                                                                    check your junk and spam mail.
                                                                    <br />
                                                                    <br />
                                                                    If you still haven't received the verification
                                                                    email, log in and select the "Resend Verification
                                                                    Email" button.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard + " " + styles.mt10}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={3}>
                                                                    How do I Login ?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={3}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Select the 'Sign Up / Login' button on the top right
                                                                    of the page.
                                                                    <br />
                                                                    Enter your email address you used when you signed up
                                                                    and your password.
                                                                    <br />
                                                                    Then select the 'Login' button
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard + " " + styles.mt10}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={4}>
                                                                    I forgot my password
                                                                    <span>How do I retrieve it or reset it?</span>
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={4}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Select the 'Sign Up / Login' button on the top right
                                                                    of the page.
                                                                    <br />
                                                                    On the Sign Up / Login page, select the 'Password
                                                                    reset' button.
                                                                    <br />
                                                                    Enter in your email address associated with your
                                                                    account and we will send you an email with a link to
                                                                    reset your password.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                                {/* </div> */}
                                            </Card.Body>
                                            {/* </div> */}
                                        </Accordion.Collapse>
                                        {/* </div> */}
                                    </Card>
                                    <Card bsPrefix={styles.outerCard}>
                                        <Card.Header bsPrefix={styles.outerCardHeader}>
                                            <h5 className="mb-0">
                                                <Accordion.Toggle className="btn btn-link" eventKey={5}>
                                                    Bookings
                                                </Accordion.Toggle>
                                            </h5>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={5}>
                                            <Card.Body bsPrefix={styles.outerCardBody}>
                                                <Accordion defaultActiveKey="6">
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={6}>
                                                                    How does the process of requesting a temporary home
                                                                    rental work?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={6}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    1. Enter the dates and destination of when and where
                                                                    you are looking to rent
                                                                    <br />
                                                                    <br />
                                                                    2. Find and select a property that best suit your
                                                                    needs
                                                                    <br />
                                                                    <br />
                                                                    3. Click the “Apply Now” button to request for a
                                                                    booking
                                                                    <br />
                                                                    <br />
                                                                    4. You will then be prompted to fill in your payment
                                                                    details. (No payment will be deducted until the
                                                                    homeowner accepts your booking request)
                                                                    <br />
                                                                    <br />
                                                                    5. The Homeowner will be notified of your request
                                                                    and will have 24 hours to review your application
                                                                    and respond back to you
                                                                    <br />
                                                                    <br />
                                                                    6. Once approved you will receive an email of your
                                                                    rental booking confirmation with further information
                                                                    on the logistics of moving in.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={7}>
                                                                    What is the minimum rental period I can rent for?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={7}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Rentality specialises in temporary home rentals.
                                                                    Tenants and homeowners are only allowed to book and
                                                                    list properties for a minimum rental period of 1
                                                                    month.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={7}>
                                                                    Why am I only charged for 1 month of rent to book?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={7}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Rentality provides booking arrangement services
                                                                    between homeowners and tenants.
                                                                    <br />
                                                                    Hence we only charge 1 month of rent as the payment
                                                                    amount to secure the booking.
                                                                    <br />
                                                                    <br />
                                                                    If your rental arrangements are for more than 1
                                                                    month, both the tenant and homeowner would need to
                                                                    arrange the remaining rental payments themselves.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={8}>
                                                                    How do I cancel or change my booking?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={8}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    On your dashboard page, select the 'Change or Cancel
                                                                    Reservation' button.
                                                                    <br />
                                                                    Provide your reason of why you have decided to
                                                                    cancel or change your reservation.
                                                                    <br />
                                                                    <br />
                                                                    Dependent on your cancellation policy or the host
                                                                    you have, you may be able to cancel your booking
                                                                    with a full refund (Not including booking service
                                                                    fee).
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle className="btn btn-link" eventKey={9}>
                                                                    How long would it take for the homeonwer to respond
                                                                    back to my booking request?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={9}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    The homeowner is given 24 hours to respond back to
                                                                    your booking request. If the homeowner does not
                                                                    respond back in 24 hours, you would receive an
                                                                    automatic rejection due to the homeowner's
                                                                    inactivity.
                                                                    <br />
                                                                    <br />
                                                                    If you really like the property listed and received
                                                                    a rejection due to the homeonwer's inactivity, you
                                                                    can try to book for that accommodation again.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card bsPrefix={styles.outerCard}>
                                        <Card.Header bsPrefix={styles.outerCardHeader}>
                                            <h5 className="mb-0">
                                                <Accordion.Toggle className="btn btn-link" eventKey={10}>
                                                    Payment
                                                </Accordion.Toggle>
                                            </h5>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={10}>
                                            <Card.Body bsPrefix={styles.outerCardBody}>
                                                <Accordion defaultActiveKey="11">
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={11}
                                                                >
                                                                    How does the payment system work?
                                                                    <span>When will my credit card be charged?</span>
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={11}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>1</p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={12}
                                                                >
                                                                    Verify Email ?
                                                                    <span>
                                                                        Once Registered, an email link will be sent to
                                                                        activate the account.
                                                                    </span>
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={12}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Payment is only deducted from the tenant after the
                                                                    homeowner has reviewed and approved the tenant's
                                                                    booking request.
                                                                    <br />
                                                                    <br />
                                                                    This payment is first transferred to Rentality and
                                                                    would be stored into Rentality's digital trust
                                                                    account. The purpose of this payment is to secure
                                                                    the booking.
                                                                    <br />
                                                                    <br />
                                                                    This booking payment is then transferred to the
                                                                    homeowner 24 hours after the tenant has moved in
                                                                    into their accommodation.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={13}
                                                                >
                                                                    What is stripe and why is it used for payment
                                                                    transactions? &lt;
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={13}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    <a href="https://stripe.com/au">
                                                                        Stripe is an international payment service
                                                                        provider
                                                                    </a>
                                                                    . Stripe has the highest payment security
                                                                    creditation, being certified to{" "}
                                                                    <a href="https://stripe.com/docs/security/stripe">
                                                                        {" "}
                                                                        PCI Service Provider Level 1{" "}
                                                                    </a>
                                                                    .
                                                                    <br />
                                                                    <br />
                                                                    We use Stripe because all your payment details and
                                                                    transactions are securely encrypted and protected
                                                                    through Stripe.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={14}
                                                                >
                                                                    My credit card payment was declined. What happened?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={14}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    When you enter in your payment details, our payment
                                                                    service provider carries out a real time examination
                                                                    of your credit card. The most common cause for
                                                                    payments being declined are entering the wrong
                                                                    credit card information or entering the wrong
                                                                    payment address.
                                                                    <br />
                                                                    <br />
                                                                    If this is not the case, your bank has probably
                                                                    rejected your payment. The most common cause for
                                                                    this, is probnably because your credit card is not
                                                                    approved for international payments via the internet
                                                                    or that your credit card limit has been reached. We
                                                                    recommend calling your bank to clarify this
                                                                    situation.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={15}
                                                                >
                                                                    What is a CVC, CVV or verification code?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={15}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    This code can be found on the back of your
                                                                    VISA/Mastercard or JCB (3 digits).
                                                                    <br />
                                                                    On American Express cards you can find the
                                                                    verification code on the front (4 digits).
                                                                    <br />
                                                                    <br />
                                                                    The CVC, CVV or verification number is required to
                                                                    secure payments by telephone or transactions on the
                                                                    internet against fraud.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={16}
                                                                >
                                                                    As a homeowner, when would I receive payment?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={16}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    24 Hours after the tenants has moved into the rental
                                                                    property, Rentality would begin processing the
                                                                    payment to the homeowner. This process may take 3 -
                                                                    5 business days until the homeowner receives the
                                                                    payment.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={17}
                                                                >
                                                                    How much does Rentality charge to list a property?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={17}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Rentality charges the homeowner a 4% service fee of
                                                                    the total booking price.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={18}
                                                                >
                                                                    How much does Rentality charge the tenant to book a
                                                                    property?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={18}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Rentality charges the tenant a 8% service fee of one
                                                                    month of rental.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={19}
                                                                >
                                                                    How do I get a refund?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={19}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    On your dashboard page, select the 'Change or Cancel
                                                                    Reservation' button.
                                                                    <br />
                                                                    Provide your reason of why you have decided to
                                                                    cancel or change your reservation.
                                                                    <br />
                                                                    <br />
                                                                    Dependent on your cancellation policy or the host
                                                                    you have, you may be able to cancel your booking
                                                                    with a full refund (Not including booking service
                                                                    fee).
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card bsPrefix={styles.outerCard}>
                                        <Card.Header bsPrefix={styles.outerCardHeader}>
                                            <h5 className="mb-0">
                                                <Accordion.Toggle className="btn btn-link" eventKey={20}>
                                                    During the lease
                                                </Accordion.Toggle>
                                            </h5>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={20}>
                                            <Card.Body bsPrefix={styles.outerCardBody}>
                                                <Accordion defaultActiveKey="21">
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={21}
                                                                >
                                                                    If I have any problems during the lease, what do I
                                                                    do?
                                                                    <span>
                                                                        {" "}
                                                                        I am not satisfied with my accommodation
                                                                        <br />
                                                                        The tenant is being difficult
                                                                    </span>
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={21}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Start with having a conversation with the homeowner
                                                                    / tenant. This is usually the quickest solution.
                                                                    <br />
                                                                    If you are unable to resolve the problem or unable
                                                                    to contact the homeowner / tenant, please contact us
                                                                    at admin@rentality.com.au
                                                                    <br />
                                                                    <br />
                                                                    In your email, provide us with details of the
                                                                    timeframe, the scenario / situation, what you and
                                                                    the other party had done about the situation and
                                                                    attach a photo if relevant.
                                                                    <br />
                                                                    <br />
                                                                    At Rentality, your satisfaction is important to us
                                                                    and we would do the best we can to solve your
                                                                    problem together with the other party.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={22}
                                                                >
                                                                    My accommodation does not look like what was shown
                                                                    or described in the listing. What do i do?
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={22}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    Start with contacting the homeowner and explain the
                                                                    situation. Give the homeowner a chance to resolve
                                                                    the problem. This is usually the quickest solution.
                                                                    <br />
                                                                    If the homeowner is unable to resolve the problem or
                                                                    unable to be contacted, please contact us at
                                                                    admin@rentality.com.au
                                                                    <br />
                                                                    <br />
                                                                    In your email, provide us with details of the
                                                                    timeframe, the scenario / situation, what you and
                                                                    the other party had done about the situation and
                                                                    attach a photo if relevant.
                                                                    <br />
                                                                    <br />
                                                                    At Rentality, your satisfaction is important to us
                                                                    and we would do the best we can to solve your
                                                                    problem together with the other party.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card bsPrefix={styles.innerCard}>
                                                        <Card.Header bsPrefix={styles.innerCardHeader}>
                                                            <h5 className="mb-0">
                                                                <Accordion.Toggle
                                                                    className="btn btn-link"
                                                                    eventKey={23}
                                                                >
                                                                    I don't feel comfortable or I don't feel safe with
                                                                    the accommodation / tenant / host
                                                                </Accordion.Toggle>
                                                            </h5>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={23}>
                                                            <Card.Body bsPrefix={styles.innerCardBody}>
                                                                <p>
                                                                    At Rentality, your safety is our top priority. It is
                                                                    very important to us that you feel safe at your new
                                                                    home and that you do not have to worry about your
                                                                    living situation. If you are unable to resolve this
                                                                    problem with the other party, please contact us
                                                                    immediately at admin@rentality.com.au
                                                                    <br />
                                                                    <br />
                                                                    We take every complaint seriously and we will do the
                                                                    best we can to find a solution that is satisfactory
                                                                    to all parties.
                                                                </p>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                {/* </div> */}
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </div>
                {/* <!-- page faq end --> */}
            </React.Fragment>
        )
    }
}
