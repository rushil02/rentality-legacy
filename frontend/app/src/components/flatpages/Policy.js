import React, { Component } from "react"
import styles from "./Policy.module.css"
import { formatDateMDY } from "core/UIComponents/helpers"

export default class Policy extends Component {
    constructor(props) {
        super(props)
        this.policyContent = React.createRef()
    }
    componentDidMount() {
        this.policyContent.current.innerHTML = this.props.pageContext.policy.html
    }
    render() {
        let policy = this.props.pageContext.policy

        return (
            <React.Fragment>
                <div className={styles.policyPage}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className={styles.title}>{policy.verbose_name}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Last updated on: {formatDateMDY(new Date(policy.updated_on))}</h5>
                            </div>
                            <div className="col-md-6">
                                <h5 className="float-right">Version Reference: {policy.version}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div ref={this.policyContent} className="col-md-12 text-justify">
                                {policy.html}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
