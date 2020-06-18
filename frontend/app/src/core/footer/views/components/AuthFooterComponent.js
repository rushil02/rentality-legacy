import React, {Component} from "react";
import {reverse} from "named-urls";
import {PageRoutes} from "components/routes";

import "./Footer.css";

export default class AuthFooterComponent extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-3">
                            <div className="list">
                                <ul className="list-unstyled">
                                    <li>
                                        <a href={reverse(PageRoutes.home)}>Contact Us</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.home)}>Rent a Home</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.listing.create)}>List Home</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="list">
                                <ul className="list-unstyled">
                                    <li>
                                        <a href={reverse(PageRoutes.home)}>Terms of Service</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.home)}>Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.faq)}>FAQs</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.home)}>Cookies</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.blogs)}>Blog</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.home)}>About Us</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.faq)}>Help</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-lg-2" />
                                <div className=" col-md-12 col-lg-10">
                                    <div className="social-media">
                                        <ul className="list-inline">
                                            <li className="list-inline-item facebook">
                                                <a href="https://www.facebook.com/Rentality/">
                                                    <span>Facebook</span>
                                                </a>
                                            </li>

                                            <li className="list-inline-item linkedin">
                                                <a href="https://www.linkedin.com/company/rentality/)">
                                                    <span>Linkedin</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
