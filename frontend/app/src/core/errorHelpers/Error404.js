import React, {Component} from "react"
import styles from "./style.module.css"

export default class Error404 extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row" style={{paddingTop: "15%", marginBottom: "15%"}}>
                        <div className="col-3"/>
                        <div className="col-6">
                            <h5 className={styles.greyText}>404 | Oops, the page you're looking for does not exist.</h5>
                            <p className={styles.greyText}>
                                You may want to head back to the <a href="/">homepage</a>. Or <a href={"mailto:admin@rentality.com.au"}>report</a> the problem if you think
                                something is broken.
                            </p>
                        </div>
                        <div className="col-3"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
