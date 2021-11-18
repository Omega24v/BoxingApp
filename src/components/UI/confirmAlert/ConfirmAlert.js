import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ConfirmAlert = props => {
    const { itemName, confirmAction, ...rest } = props;
    return (
        <Modal className="edit-modal" {...rest} size="md" aria-labelledby="modal-title" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Please confirm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you really want to delete {itemName} ?
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" size="md" variant="primary" onClick={props.onHide}>Close</Button>
                <Button type="button" size="md" variant="danger" onClick={confirmAction}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmAlert;