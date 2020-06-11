import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"

const styleGuide = {
    container: {
        paddingTop: "0.8rem",
        textOverflow: "ellipsis",
        paddingLeft: "10px !important",
        marginTop: "3px",
    },
}

export default class FileInputComponent extends Component {
    handleClick = e => {
        this.refs.IDfileUploader.click()
    }

    render() {
        return (
            <React.Fragment>
                <div
                    tabIndex={"0"}
                    className={this.props.containerClasses || "form-control no-background"}
                    style={styleGuide.container}
                    onClick={this.handleClick}
                >
                    <input type="file" id="file" ref="IDfileUploader" style={{ display: "none" }} />
                    <div style={{ float: "left" }}>{this.props.label}</div>
                    <div style={{ float: "right", marginRight: "10px" }}>
                        <FontAwesomeIcon icon={faFileUpload} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
