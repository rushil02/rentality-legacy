import React, { Component } from "react"
import { deleteImage, getImagesData, postImagesFiles, updateImageData } from "components/houseListing/services"
import Dropzone from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImages as faImagesSolid, faTimes, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"
import { APIModelListAdapter } from "core/utils/ModelHelper"

import styles from "./UploadImagesForm.module.css"
import commonStyles from "../FormCommon.module.css"

export default class UploadImagesForm extends Component {
    formID = 5

    constructor(props) {
        super(props)
        if (props.cache.data === undefined) {
            this.state = {
                data: new APIModelListAdapter([], Image, "uuid", "empty"),
            }
        } else {
            this.state = {
                data: props.cache.data,
            }
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, "saved", "Images")

        if (this.state.data.status === "empty") {
            this.sync()
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.data.status)
        }

        this.props.navContext.sync()
    }

    sync = () => {
        getImagesData(this.props.houseUUID).then(result => {
            this.setState(prevState => ({
                ...prevState,
                data: result,
            }))
        })
    }

    componentWillUnmount() {
        this.props.cache.updateStoreObject("imagesData", () => this.state.data)
        this.props.navContext.data.unloadForm()
    }

    onSetThumbnail = uuid => {
        updateImageData(this.props.houseUUID, uuid, this.state.data.getObject(uuid).setData("isThumbnail", true)).then(
            result => {
                this.setState(prevState => ({
                    ...prevState,
                    data: prevState.data.update(result),
                }))
                this.sync()
            }
        )
    }

    onRemove = uuid => {
        deleteImage(this.props.houseUUID, uuid).then(result => {
            this.setState(prevState => ({
                ...prevState,
                data: prevState.data.remove(uuid).update(result),
            }))
        })
    }

    handleDrop = acceptedFiles => {
        acceptedFiles.forEach(file => {
            postImagesFiles(this.props.houseUUID, file).then(image => {
                this.setState(prevState => ({
                    ...prevState,
                    data: prevState.data.update(image),
                }))
            })
        })
    }

    onSave = e => {
        e.stopPropagation()
        return new Promise(function (resolve, reject) {
            resolve()
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id="form-3">
                    <div className="row">
                        <div className="col-md-1" />
                        <div className="col-md-10">
                            <h1 className={commonStyles.pageTitle}>Upload Images of your House</h1>
                            <div className="row">
                                <div className="col-lg-3 col-6">
                                    <Dropzone onDrop={this.handleDrop}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps({ className: styles.dropzone })}>
                                                <input {...getInputProps()} />
                                                <FontAwesomeIcon icon={faImagesSolid} size="3x" color={"#3fc692"} />

                                                <p
                                                    style={{ marginTop: "5px", marginBottom: 0 }}
                                                    className={"align-bottom"}
                                                >
                                                    Drop files here or click to select files
                                                </p>
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                                {this.state.data.getObjectList().map(item => (
                                    <ImageComponent
                                        objRef={item[0]}
                                        data={item[1]}
                                        key={item[0]}
                                        onRemove={this.onRemove}
                                        onSetThumbnail={this.onSetThumbnail}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-1" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function ImageComponent(props) {
    if (props.data.getData("isThumbnail")) {
        return (
            <div className="col-lg-3 col-6" style={{ marginBottom: "20px" }}>
                <div
                    className={styles.imageContainer + " img-thumbnail " + styles.thumbnail}
                    style={{ backgroundImage: `url(${props.data.getData("imagePath")})` }}
                ></div>
                <div className={styles.tools}>
                    <div className={styles.tool}>
                        <FontAwesomeIcon icon={faStarSolid} size="3x" color={"#39b88a"} title={"Current Thumbnail"} />
                    </div>
                    <div className={styles.tool}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            size="3x"
                            title={"Delete Picture"}
                            className={styles.clickable}
                            color={"red"}
                            onClick={e => props.onRemove(props.objRef)}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="col-lg-3 col-6" style={{ marginBottom: "20px" }}>
                <div className={"img-thumbnail"}>
                    <div
                        className={styles.imageContainer + " img-thumbnail"}
                        style={{ backgroundImage: `url(${props.data.getData("imagePath")})`, marginBottom: 0 }}
                    ></div>
                    <div className={styles.tools}>
                        <div className={styles.tool}>
                            <FontAwesomeIcon
                                icon={faStarRegular}
                                size="3x"
                                color={"#39b88a"}
                                title={"Set as Thumbnail"}
                                onClick={e => props.onSetThumbnail(props.objRef)}
                                className={styles.clickable}
                            />
                        </div>
                        <div className={styles.tool}>
                            <FontAwesomeIcon
                                icon={faTimes}
                                size="3x"
                                title={"Delete Picture"}
                                color={"red"}
                                onClick={e => props.onRemove(props.objRef)}
                                className={styles.clickable}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
