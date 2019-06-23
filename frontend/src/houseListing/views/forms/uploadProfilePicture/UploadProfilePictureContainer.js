import React, {Component} from 'react';
import {deleteProfilePic, getProfilePicLink, uploadProfilePic} from "userAccount/services";
import Dropzone from "react-dropzone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPortrait, faTimes, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

import styles from "./UploadProfilePicture.css";
import commonStyles from "../FormCommon.css"


export default class UploadProfilePictureContainer extends Component {
    formID = 9;

    constructor(props) {
        super(props);
        if (props.cache.data === undefined) {
            this.state = {
                imagePath: null,
            };
        } else {
            this.state = {
                imagePath: props.cache.data,
            };
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'saved', "Rent & Availability");

        if (!this.state.imagePath) {
            getProfilePicLink(this.props.houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            imagePath: result,
                        })
                    );
                });
        }
        this.props.navContext.sync();
    };

    componentWillUnmount() {
        this.props.cache.updateStoreObject('userProfilePic', () => this.state.imagePath);
        this.props.navContext.data.unloadForm();
    }

    onRemove = (e) => {
        e.stopPropagation();
        deleteProfilePic()
            .then(result => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        imagePath: null
                    })
                );
            });
    };

    handleDrop = (acceptedFiles) => {
        acceptedFiles.map(file => {
            uploadProfilePic(file)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            imagePath: result,
                        }
                    ))
                })
        })
    };

    onSave = (e) => {
        e.stopPropagation();
        return new Promise(function (resolve, reject) {
            resolve()
        })
    };

    render() {
        return (
            <React.Fragment>
                <div id="form-9">
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-10">
                            <h1 className={commonStyles.pageTitle}>Show your tenant what you look like.</h1>
                            <div className="d-flex justify-content-center">
                                <div className="col-4">

                                    <Dropzone onDrop={this.handleDrop} multiple={false}>
                                        {({getRootProps, getInputProps}) => (
                                            <div {...getRootProps({className: styles.dropzone})}>
                                                <input {...getInputProps()} />
                                                {this.state.imagePath ?
                                                    <React.Fragment>
                                                        <div className={styles.imageContainer + ' img-thumbnail'}
                                                             style={{
                                                                 backgroundImage: `url(${this.state.imagePath})`,
                                                             }}>
                                                        </div>
                                                        <div className={styles.tools}>
                                                            <div className={styles.tool}>
                                                                <FontAwesomeIcon icon={faPencilAlt} size="3x"
                                                                                 color={"#39b88a"}
                                                                                 title={"Change Profile Picture"}
                                                                                 className={styles.clickable}

                                                                />
                                                            </div>
                                                            <div className={styles.tool}>
                                                                <FontAwesomeIcon icon={faTimes} size="3x"
                                                                                 title={"Delete Picture"}
                                                                                 color={"red"}
                                                                                 onClick={(e) => this.onRemove(e)}
                                                                                 className={styles.clickable}
                                                                />
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    :

                                                    <div className={styles.emptyContainer}>
                                                        <FontAwesomeIcon icon={faPortrait} size="8x" color={"#3fc692"}/>

                                                        <p style={{marginTop: "5px", marginBottom: 0}}
                                                           className={'align-bottom'}>Drop files here or click
                                                            to select files</p>
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-1"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}