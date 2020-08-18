import React, { Component } from "react"
import styles from "./AboutUs.module.css"

export default class AboutUs extends Component {
    render() {
        return (
            <React.Fragment>
                {/* <!-- page about image start --> */}
                <div className={styles.aboutImage + " d-flex"}>
                    <div className="w-100 align-self-center">
                        <div className="container">
                            <h1>
                                A community marketplace for
                                <br />
                                temporary home rentals
                            </h1>
                        </div>
                    </div>
                </div>
                {/* <!-- page about image end --> */}
                {/* <!-- page about text start --> */}
                <div className={styles.aboutText}>
                    <div className="container">
                        <p>
                            We are a marketplace that solves the problem of finding affordable temporary home rentals.
                            Our mission is to make it possible for everyone to be able to travel longer in pursuit of
                            their dream or passion.
                        </p>
                    </div>
                </div>
                {/* <!-- page about text end -->*/}
                {/* <!-- page about content start --> */}
                <div className={styles.aboutContent}>
                    <div className="container">
                        <div className={"row " + styles.mb50}>
                            <div className="col-md-6">
                                <img
                                    src="/dj_static/image/page-about/content/1.jpeg"
                                    className="w-100 bottom-margin"
                                    alt=""
                                    title=""
                                />
                            </div>
                            <div className="col-md-6">
                                <h2>We make finding temporary home rentals easy</h2>
                                <p>
                                    We know from personal experience how complicated, time-consuming and expensive it is
                                    to find a temporary home rental. Service apartments and hotels are too expensive and
                                    just don't feel like home. Long-Term Residentials have a lot of requirements that
                                    take too much time to apply for.
                                </p>
                                <p>
                                    Here at Rentality, we are dedicated to help find you a home away from home that is
                                    affordable, easy to book, safe and secure.
                                </p>
                            </div>
                        </div>
                        <div className={"row " + styles.mb50}>
                            <div className="col-md-6 d-block d-md-none d-lg-none d-xl-none">
                                <img
                                    src="/dj_static/image/page-about/content/2.jpeg"
                                    className="w-100 bottom-margin"
                                    alt=""
                                    title=""
                                />
                            </div>
                            <div className="col-md-6">
                                <h2>Book your next accommodation with confidence</h2>
                                <p>
                                    We have built a platform that manages multiple listings showing real time updates on
                                    the availability of properties. It is designed to make your bookings experience
                                    simple and quick; you can expect a response from your booking in no more than 24
                                    hours.
                                </p>
                                <p>
                                    Our team actively monitors every listing and have built security measures to ensure
                                    legitimate properties are listed. We care about your privacy and personal
                                    information, and we have built a secure platform to ensure every listing, booking
                                    and payment made is safe.
                                </p>
                            </div>
                            <div className="col-md-6 d-none d-md-block d-lg-block d-xl-block">
                                <img
                                    src="/dj_static/image/page-about/content/2.jpeg"
                                    className="w-100 top-margin"
                                    alt=""
                                    title=""
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <img
                                    src="/dj_static/image/page-about/content/3.jpg"
                                    className="w-100 bottom-margin"
                                    alt=""
                                    title=""
                                />
                            </div>
                            <div className="col-md-6">
                                <h2>The Story of Rentality</h2>
                                <p>
                                    The founders of Rentality had personnally experienced the difficulties of finding
                                    and remotely securing an affordable temporary home rental. We despised the
                                    complexity and the time it took just to secure a temporary home rental remotely. So
                                    we decided to build a platform that would make this whole process quick, simple and
                                    affordable.
                                </p>
                                <p>
                                    Our vision is to enable everyone to travel for longer periods of time in pursuit of
                                    their passion.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- page about content end --> */}
                {/* <!-- page about our values start --> */}
                <div className={styles.aboutOurValues}>
                    <div className="container">
                        <h1>Our values</h1>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={styles.icon}>
                                    <div className={styles.image}>
                                        <img src="/dj_static/image/page-about/our-values/1.svg" alt="" title="" />
                                    </div>
                                    <h2>Safe and Secure</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles.icon}>
                                    <div className={styles.image}>
                                        <img src="/dj_static/image/page-about/our-values/2.svg" alt="" title="" />
                                    </div>
                                    <h2>Affordable and Quality Homes</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles.icon}>
                                    <div className={styles.image}>
                                        <img src="/dj_static/image/page-about/our-values/3.svg" alt="" title="" />
                                    </div>
                                    <h2>Seamless Experience</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles.icon}>
                                    <div className={styles.image}>
                                        <img src="/dj_static/image/page-about/our-values/4.svg" alt="" title="" />
                                    </div>
                                    <h2>Community Orientated</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- page about our values end --> */}
            </React.Fragment>
        )
    }
}
