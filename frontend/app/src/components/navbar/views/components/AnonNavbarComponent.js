import React, { Component } from "react"
import { Link } from "gatsby"
import { reverse } from "named-urls"
import routes from "components/routes"
import styles from "./Navbar.module.css"

export default class AnonNavbarComponent extends Component {
    componentDidMount() {
        // $(window).resize(function () {
        //     $("#root").css("margin-top", $("#root > .menu.white").innerHeight() + "px");
        // });
        // $(window).resize();
        // // FIXME: Needs to be converted to Another Component and Remove jQuery
        // if ($("#root > .mobile-menu").length > 0 && $("#root > .mobile-menu-content").length > 0) {
        //     $("#root > .mobile-menu").click(function () {
        //         if ($("#root > .mobile-menu-content").hasClass("open")) {
        //             $("#root").css("overflow", "auto");
        //             $("#root > .mobile-menu-content").removeClass("open");
        //             $("#root > .mobile-menu").removeClass("open");
        //
        //             $("#root > .mobile-menu-content").html("");
        //         } else {
        //             $("#root").css("overflow", "hidden");
        //             $("#root > .mobile-menu-content").addClass("open");
        //             $("#root > .mobile-menu").addClass("open");
        //
        //             $("#root > .mobile-menu-content").html(
        //                 '<div class="top">' +
        //                 $("#root > .menu .right").html() +
        //                 "</div>" +
        //                 '<div class="bottom">' +
        //                 $("#root > .menu .center").html() +
        //                 "</div>"
        //             );
        //
        //             $("#root > .mobile-menu-content")
        //                 .find(".dropdown")
        //                 .off()
        //                 .click(function () {
        //                     if ($(this).hasClass("show")) {
        //                         $(this).removeClass("show");
        //                         $(this).find(".dropdown-menu").removeClass("show");
        //                     } else {
        //                         $(this).addClass("show");
        //                         $(this).find(".dropdown-menu").addClass("show");
        //                     }
        //                 });
        //         }
        //     });
        // }
    }

    render() {
        return (
            <React.Fragment>
                <div className={`${styles.mobileMenu} ${styles.white}`} />
                <div className={`${styles.mobileMenuContent} ${styles.white}`} />
                <div className={`${styles.menu} ${styles.white}`}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className={`col-9 col-md-4 col-lg-4 col-xl-4 left ${styles.left}`}>
                                <a href="/" className={`${styles.logo}`} />
                            </div>
                            <div
                                className={`col-3 col-md-8 col-lg-8 col-xl-4 center align-self-center ${styles.center}`}
                            >
                                <ul className={`list-inline ${styles.listInline}`}>
                                    <li className="list-inline-item">
                                        <Link to={reverse(routes.home)}>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href={reverse(routes.faq)}>FAQ</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href={reverse(routes.howItWorks)}>How It Works</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={reverse(routes.houseListing.create)}>
                                            List Your Home
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={`col-md-12 col-lg-12 col-xl-4 right align-self-center ${styles.right}`}>
                                <ul className={`list-inline ${styles.listInline}`}>
                                    <li className="list-inline-item">
                                        <a href={reverse(routes.auth.login)}>Login</a>
                                    </li>
                                    <li className="list-inline-item green">
                                        <a href={reverse(routes.auth.signup)}>Sign up</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
