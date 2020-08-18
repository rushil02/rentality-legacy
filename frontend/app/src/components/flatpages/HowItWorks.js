import React, { Component } from "react"
import styles from "./HowItWorks.module.css"
import Tab from "react-bootstrap/Tab"
import Nav from "react-bootstrap/Nav"

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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/1/1.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/1/2.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/1/3.svg")`,
                                            }}
                                        >
                                            <div className={styles.rank}>3</div>
                                            <h1>
                                                <br />
                                                <br />
                                                Click the “Apply Now” button to request for a booking
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/1/4.svg")`,
                                            }}
                                        >
                                            <div className={styles.rank}>4</div>
                                            <h1>
                                                <br />
                                                <br />
                                                You will then be prompted to fill in your payment details. (The payment
                                                is inclusive of Rentality's service fee)
                                                <br />
                                            </h1>
                                        </div>
                                        <div
                                            className={styles.list}
                                            style={{
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/1/5.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/2/1.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/2/2.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/2/3.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/2/4.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/2/5.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/2/6.svg")`,
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
                                                backgroundImage: `url("/dj_static/image/page-how-does-it-work/2/8.svg")`,
                                            }}
                                        >
                                            <div className={styles.rank}>7</div>
                                            <h1>
                                                <br />
                                                <br />
                                                24 Hours after the tenant has moved in, you would receive one month of
                                                rent as the booking payment (Rentality would charge a 4% service fee of
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
