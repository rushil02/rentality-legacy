import React, {Component} from "react";
import {reverse} from "named-urls";
import routes from "components/routes";
import styles from "./Navbar.module.css";

export default class AnonNavbarComponent extends Component {
    componentDidMount() {}

    render() {
        return (
            <React.Fragment>
                <ul className={styles.listInline}>
                    <li className="list-inline-item">
                        <a href={reverse(routes.auth.login)}>Login</a>
                    </li>
                    <li className="list-inline-item green">
                        <a href={reverse(routes.auth.signup)}>Sign up</a>
                    </li>
                </ul>
            </React.Fragment>
        );
    }
}
