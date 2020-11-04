import React, { Component } from "react"
import { reverse } from "named-urls"
import routes, { PageRoutes } from "components/routes"
import styles from "./Navbar.module.css"
import Dropdown from "react-bootstrap/Dropdown"
import profilePlaceholderThumbnail from "images/placeholders/profile.png"

export default class AuthNavbarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.liPersonRef = React.createRef()
    }

    handleResize = () => {
        this.props.handleGrayDiv(this.liPersonRef.current.getBoundingClientRect().x)
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize)
        this.handleResize()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize)
    }

    render() {
        const profileImage = this.props.user.getData("profilePicture")
        return (
            <React.Fragment>
                <ul className={styles.listInline}>
                    <li className={"list-inline-item " + styles.message}>
                        <Dropdown bsPrefix={styles.dropdown}>
                            <Dropdown.Toggle bsPrefix={styles.dropdownToggle} as="a">
                                Message<span>0</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight />
                        </Dropdown>
                    </li>
                    <li className={"list-inline-item " + styles.notification}>
                        <Dropdown bsPrefix={styles.dropdown}>
                            <Dropdown.Toggle bsPrefix={styles.dropdownToggle} as="a">
                                Notifications<span>0</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight />
                        </Dropdown>
                    </li>
                    <li ref={this.liPersonRef} className={"list-inline-item " + styles.person}>
                        <a href={reverse(PageRoutes.dashboard.base)} style={{ textTransform: "capitalize" }}>
                            <div className={styles.image}>
                                <img
                                    src={profileImage ? profileImage : profilePlaceholderThumbnail}
                                    className="w-100"
                                    alt="Profile"
                                />
                            </div>
                            {this.props.user.getData("firstName")}
                        </a>
                    </li>
                    <li className={"list-inline-item " + styles.setting}>
                        <Dropdown bsPrefix={styles.dropdown}>
                            <Dropdown.Toggle bsPrefix={styles.dropdownToggle} as="a">
                                Setting
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight>
                                <Dropdown.Item
                                    bsPrefix={"dropdown-item " + styles.darkText}
                                    href={reverse(PageRoutes.user.userProfile)}
                                >
                                    My Profile
                                </Dropdown.Item>
                                <Dropdown.Item
                                    bsPrefix={"dropdown-item " + styles.darkText}
                                    href={reverse(PageRoutes.auth.logout)}
                                >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}
