import React, { Component } from "react"
import styles from "./HowItWorks.module.css"
import Tab from "react-bootstrap/Tab"
import Nav from "react-bootstrap/Nav"
import hdiwBooking1 from "images/page-how-does-it-work/1/1.svg"
import hdiwBooking2 from "images/page-how-does-it-work/1/2.svg"
import hdiwBooking3 from "images/page-how-does-it-work/1/3.svg"
import hdiwBooking4 from "images/page-how-does-it-work/1/4.svg"
import hdiwBooking5 from "images/page-how-does-it-work/1/5.svg"
import hdiwHost1 from "images/page-how-does-it-work/2/1.svg"
import hdiwHost2 from "images/page-how-does-it-work/2/2.svg"
import hdiwHost3 from "images/page-how-does-it-work/2/3.svg"
import hdiwHost4 from "images/page-how-does-it-work/2/4.svg"
import hdiwHost5 from "images/page-how-does-it-work/2/5.svg"
import hdiwHost6 from "images/page-how-does-it-work/2/6.svg"
import hdiwHost7 from "images/page-how-does-it-work/2/8.svg"

export default class HowItWorks extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.HowDoesItWork}>
                    <div className="container">
                        <h1 className={styles.title}>How does it work</h1>
                        <Tab.Container id="custom-tab" defaultActiveKey="booking">
                            <Nav as="ul" defaultActiveKey="booking" bsPrefix={"nav " + styles.navTabs}>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="booking">How do I make a booking?</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="host">How do I become a host?</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="booking">
                                    <div className={styles.lists}>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwBooking1})`,
                                            }}
                                        >
                                            <div className={styles.rank}>1</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Enter the dates and destination of when and where you are looking to
                                                rent
                                            </h1>
                                            <br />
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwBooking2})`,
                                            }}
                                        >
                                            <div className={styles.rank}>2</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Find and select a property that best suit your needs
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwBooking3})`,
                                            }}
                                        >
                                            <div className={styles.rank}>3</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Click the “Book Now” button to make a reservation for the dates.
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwBooking4})`,
                                            }}
                                        >
                                            <div className={styles.rank}>4</div>
                                            <h1>
                                                <br />
                                                <br />
                                                You will be prompt to pay a 4 weeks deposit using Stripe.
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwBooking5})`,
                                            }}
                                        >
                                            <div className={styles.rank}>5</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Once approved you will receive an email of your rental booking
                                                confirmation with further information on the logistics of moving in.
                                                <br />
                                            </h1>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="host">
                                    <div className={styles.lists}>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwHost1})`,
                                            }}
                                        >
                                            <div className={styles.rank}>1</div>
                                            <h1>
                                                <br />
                                                <br />
                                                <br />
                                                Signup or Login
                                                <br />
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwHost2})`,
                                            }}
                                        >
                                            <div className={styles.rank}>2</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Select the “List Your Home” button on the top right of the page
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwHost3})`,
                                            }}
                                        >
                                            <div className={styles.rank}>3</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Fill in details about your property and upload photos of your property
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwHost4})`,
                                            }}
                                        >
                                            <div className={styles.rank}>4</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Provide us with your bank account details that you want to receive
                                                payments in
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwHost5})`,
                                            }}
                                        >
                                            <div className={styles.rank}>5</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Your property is now listed, and you would be notified when a tenant
                                                makes a booking to rent your property
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwHost6})`,
                                            }}
                                        >
                                            <div className={styles.rank}>6</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Rentality would charge the tenant one month of rent to secure the
                                                booking. You would then receive an email of the booking confirmation
                                                with further information on the logistics of hosting your tenant
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url(${hdiwHost7})`,
                                            }}
                                        >
                                            <div className={styles.rank}>7</div>
                                            <h1>
                                                <br />
                                                <br />
                                                24 Hours after the tenant has moved in, you would receive one month of
                                                rent as the booking payment (Rentality would charge a 5% service fee of
                                                the whole booking)
                                                <br />
                                            </h1>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
