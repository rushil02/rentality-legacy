import React, { Component } from "react"
import { deleteProfilePic, getProfilePicLink, uploadProfilePic } from "userAccount/services"
import Dropzone from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPortrait, faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import styles from "./UploadProfilePic.css"

export default class UploadProfilePicContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagePath: null,
        }
    }

    componentDidMount() {
        getProfilePicLink(this.props.houseUUID).then(result => {
            this.setState(prevState => ({
                ...prevState,
                imagePath: result,
            }))
        })
    }

    onRemove = e => {
        e.stopPropagation()
        deleteProfilePic().then(result => {
            this.setState(prevState => ({
                ...prevState,
                imagePath: null,
            }))
        })
    }

    handleDrop = acceptedFiles => {
        acceptedFiles.map(file => {
            uploadProfilePic(file).then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    imagePath: result,
                }))
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id={"profile-pic"} style={{ marginTop: "15%", marginBottom: "15%" }}>
                    <div className="d-flex justify-content-center">
                        <div className="col-12">
                            <Dropzone onDrop={this.handleDrop} multiple={false}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: styles.dropzone })}>
                                        <input {...getInputProps()} />
                                        {this.state.imagePath ? (
                                            <React.Fragment>
                                                <div
                                                    className={styles.imageContainer + " img-thumbnail"}
                                                    style={{
                                                        backgroundImage: `url(${this.state.imagePath})`,
                                                    }}
                                                ></div>
                                                <div className={styles.tools}>
                                                    <div className={styles.tool}>
                                                        <FontAwesomeIcon
                                                            icon={faPencilAlt}
                                                            size="3x"
                                                            color={"#39b88a"}
                                                            title={"Change Profile Picture"}
                                                            className={styles.clickable}
                                                        />
                                                    </div>
                                                    <div className={styles.tool}>
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                            size="3x"
                                                            title={"Delete Picture"}
                                                            color={"red"}
                                                            onClick={e => this.onRemove(e)}
                                                            className={styles.clickable}
                                                        />
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            <div className={styles.emptyContainer}>
                                                <div className={"col-12"}>
                                                    <FontAwesomeIcon icon={faPortrait} size="8x" color={"#3fc692"} />
                                                </div>
                                                <div className={"col-12"}>
                                                    <p
                                                        style={{ marginTop: "5px", marginBottom: 0 }}
                                                        className={"align-bottom"}
                                                    >
                                                        Drop image file here or click to select file
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
