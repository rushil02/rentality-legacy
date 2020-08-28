import React, { Component } from "react"
import { reverse } from "named-urls"
import { PageRoutes } from "components/routes"

import "./Footer.css"

export default class AnonFooterComponent extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-3">
                            <div className="list">
                                <ul className="list-unstyled">
                                    <li>
                                        <a href={reverse(PageRoutes.contactUs)}>Contact Us</a>
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
                                        <a href={reverse(PageRoutes.termsOfService)}>Terms of Service</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.privacyPolicy)}>Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.faq)}>FAQs</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.cookiePolicy)}>Cookies</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.blog.base)}>Blog</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.aboutUs)}>About Us</a>
                                    </li>
                                    <li>
                                        <a href={reverse(PageRoutes.contactUs)}>Help</a>
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
                                    <div className="e-mail">
                                        <h2 className="title">Get news from innovations </h2>
                                        <div className="detail">
                                            <div className="row">
                                                <div className="col-md-7 col-lg-8">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control"
                                                        placeholder="Your Mail address"
                                                    />
                                                </div>
                                                <div className="col-md-5 col-lg-4">
                                                    <button type="button" className="btn btn-link btn-block">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
