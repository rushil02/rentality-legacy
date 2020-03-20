import React, { useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton";
import styles from "./ConfirmBookingModal.css";
import routes from "routes";
import { reverse } from "named-urls";

export const ConfirmBookingModal = React.forwardRef((props, ref) => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const successRoute = reverse(routes.react.apply.success, {
        applicationUUID: props.applicationUUID
    });

    useImperativeHandle(ref, () => ({
        closeModal() {
            handleClose();
        }
    }));

    return (
        <React.Fragment>
            <APIRequestButton
                layoutClasses={"imp-button-style"}
                cTextOptions={{
                    default: "Book Now",
                    loading: "Making Your Booking",
                    done: "Booked",
                    error: "Error!"
                }}
                callback={props.onApply}
                onSuccess={() => {
                    handleShow();
                }}
            />
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
                    <h1>Are you sure you want to book the house?</h1>
                    <div className="text-left">
                        <p>
                            Please ensure that all the provided details are
                            correct before booking.
                        </p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <APIRequestButton
                            layoutClasses={"btn float-left imp-button-style"}
                            cTextOptions={{
                                default: "Confirm Booking",
                                loading: "Making Your Booking",
                                done: "Booked",
                                error: "Error!"
                            }}
                            callback={props.onConfirmBooking}
                            onSuccess={() => {
                                window.location.href = successRoute;
                            }}
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
        </React.Fragment>
    );
});
