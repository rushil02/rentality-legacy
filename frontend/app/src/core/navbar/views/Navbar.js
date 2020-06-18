import React, {Component} from "react";
import {UserContext} from "core/auth/userContext";
import AuthNavbarComponent from "./components/AuthNavbarComponent";
import AnonNavbarComponent from "./components/AnonNavbarComponent";
import {reverse} from "named-urls";
import styles from "./components/Navbar.module.css";
import {PageRoutes} from "components/routes";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.menuRef = React.createRef();
        this.grayDivRef = React.createRef();
        this.rootEle = document.getElementById("___gatsby");
        this.state = {mobileMenuOpen: false};
    }

    handleResize = () => {
        if (this.props.locContext.location.pathname !== PageRoutes.home) {
            this.rootEle.style.marginTop = this.menuRef.current.clientHeight + "px";
        }
    };

    handleGrayDiv = (value) => {
        if (this.grayDivRef && this.grayDivRef.current.children[0]) {
            this.grayDivRef.current.children[0].style.left = value + "px";
        }
    };

    handleMobileOpen = () => {
        this.setState((prevState) => ({
            ...prevState,
            mobileMenuOpen: !prevState.mobileMenuOpen,
        }));
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.mobileMenuOpen !== this.state.mobileMenuOpen) {
            if (this.mobileMenuOpen) {
                this.rootEle.style.overflow = "hidden";
            } else {
                this.rootEle.style.overflow = "auto";
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    getCssClasses() {
        if (this.props.locContext.location.pathname === PageRoutes.home) {
            return {cssMobile: "", cssClass: " " + styles.session, isHome: true};
        } else {
            return {cssMobile: " " + styles.white, cssClass: " " + styles.white, isHome: false};
        }
    }

    render() {
        const routeSpecs = this.getCssClasses();
        const isOpen = this.state.mobileMenuOpen ? " " + styles.open : "";
        console.log(this.props)

        return (
            <UserContext.Consumer>
                {(userContext) => (
                    <React.Fragment>
                        <div
                            className={styles.mobileMenu + routeSpecs.cssMobile + isOpen} role={"button"}
                            onClick={this.handleMobileOpen} onKeyUp={event => {console.log(event)}} tabIndex={0}
                        />
                        <div className={styles.mobileMenuContent + routeSpecs.cssMobile + isOpen}>
                            {this.state.mobileMenuOpen ? <MobileMenu userContext={userContext} /> : ""}
                        </div>
                        <div ref={this.menuRef} className={styles.menu + routeSpecs.cssClass}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className={"col-9 col-md-4 col-lg-4 col-xl-4 " + styles.left}>
                                        <a href="/" className={styles.logo}><span>Rentality - Home Page</span></a>
                                    </div>
                                    <div
                                        className={
                                            "col-3 col-md-8 col-lg-8 col-xl-4 " + styles.center + " align-self-center"
                                        }
                                    >
                                        <ul className={styles.listInline}>
                                            <li className="list-inline-item">
                                                <a href={reverse(PageRoutes.home)}>Home</a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href={reverse(PageRoutes.faq)}>FAQ</a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href={reverse(PageRoutes.howItWorks)}>How It Works</a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href={reverse(PageRoutes.listing.create)}>List Your Home</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        className={
                                            "col-md-12 col-lg-12 col-xl-4 " + styles.right + " align-self-center"
                                        }
                                    >
                                        {userContext.isAuthenticated ? (
                                            <AuthNavbarComponent
                                                user={userContext.data}
                                                handleGrayDiv={this.handleGrayDiv}
                                            />
                                        ) : (
                                            <AnonNavbarComponent />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div ref={this.grayDivRef}>
                                {userContext.isAuthenticated && !routeSpecs.isHome ? (
                                    <div className={styles.gray} />
                                ) : null}
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </UserContext.Consumer>
        );
    }
}

function MobileMenu(props) {
    return (
        <React.Fragment>
            <div className={styles.top}>
                {props.userContext.isAuthenticated ? (
                    <AuthNavbarComponent user={props.userContext.data} handleGrayDiv={() => {}} />
                ) : (
                    <AnonNavbarComponent />
                )}
            </div>
            <div className={styles.bottom}>
                <ul className={styles.listInline}>
                    <li className="list-inline-item">
                        <a href={reverse(PageRoutes.home)}>Home</a>
                    </li>
                    <li className="list-inline-item">
                        <a href={reverse(PageRoutes.faq)}>FAQ</a>
                    </li>
                    <li className="list-inline-item">
                        <a href={reverse(PageRoutes.howItWorks)}>How It Works</a>
                    </li>
                    <li className="list-inline-item">
                        <a href={reverse(PageRoutes.houseListing.create)}>List Your Home</a>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}

export default Navbar;
