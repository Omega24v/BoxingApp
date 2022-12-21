import React from 'react';
import {Button, Modal} from "react-bootstrap";
import { FormattedMessage } from 'react-intl';

const ConfirmAlert = props => {
    const { itemName, confirmAction, ...rest } = props;
    return (
        <Modal className="edit-modal" {...rest} size="md" aria-labelledby="modal-title" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FormattedMessage id='pleaseConfirm' />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormattedMessage id='wantDelete' /> {itemName} ?
            </Modal.Body>
            <Modal.Footer>
                <Button data-testid='close-confirm-modal-btn' type="button" size="md" variant="primary" onClick={props.onHide}><FormattedMessage id='close'/></Button>
                <Button data-testid='delete-timer-btn' type="button" size="md" variant="danger" onClick={confirmAction}><FormattedMessage id='delete'/></Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmAlert;
