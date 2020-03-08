import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton";
import styles from "./Navigator.css";

export function ActivateModal(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button
                className={"dropdown-item " + styles.dropdownItem}
                onClick={handleShow}
            >
                Activate Listing
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                size="lg"
                dialogClassName="modal-dialog-centered"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className={"text-center " + styles.modalContent}>
                    <h1>Are you sure you want to list the house?</h1>
                    <div className="text-left">
                        <p>
                            Please ensure that all the provided details are
                            correct before listing.
                        </p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <APIRequestButton
                            layoutClasses={
                                "btn float-left " + styles.activateAPIBtn
                            }
                            cTextOptions={{
                                default: "Activate Listing",
                                loading: "Processing",
                                done: "Deactivate Listing",
                                error: "Error!"
                            }}
                            textDoneClasses={styles.deactivateListingText}
                            textDefaultClasses={styles.activateListingText}
                            loaderSize={6}
                            callback={props.onActivate}
                        />
                        <Button
                            className={"btn default-button-style float-right"}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export function DeleteModal(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button
                className={
                    "dropdown-item " +
                    styles.dropdownItem +
                    " " +
                    styles.deleteText
                }
                onClick={handleShow}
            >
                Delete
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                size="lg"
                dialogClassName="modal-dialog-centered"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className={"text-center " + styles.modalContent}>
                    <h1>
                        Are you sure you want to list{" "}
                        <span style={{ color: "red" }}>Delete</span>?
                    </h1>
                    <div className="text-left">
                        <p>
                            Please Note - Deleting will not affect any bookings
                            that have already been made.
                        </p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <APIRequestButton
                            layoutClasses={
                                "btn float-left " + styles.deleteAPIBtn
                            }
                            textOption={"cDelete"}
                            callback={props.onDelete}
                            onSuccess={props.onSuccess}
                        />
                        <Button
                            className={"btn default-button-style float-right"}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
