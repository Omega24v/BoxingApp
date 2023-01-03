import React from 'react';
import {Button, Modal} from "react-bootstrap";
import { FormattedMessage } from 'react-intl';

interface IProps {
  show: boolean;
  itemName: string;
  onHide: () => void;
  confirmAction: (e: React.SyntheticEvent) => void
}

const ConfirmAlert = (props: IProps) => {
    const { itemName, confirmAction, ...rest } = props;
    return (
        <Modal className="edit-modal" {...rest} aria-labelledby="modal-title" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FormattedMessage id='pleaseConfirm' />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormattedMessage id='wantDelete' /> {itemName} ?
            </Modal.Body>
            <Modal.Footer>
                <Button data-testid='close-confirm-modal-btn' type="button" variant="primary" onClick={props.onHide}><FormattedMessage id='close'/></Button>
                <Button data-testid='delete-timer-btn' type="button" variant="danger" onClick={confirmAction}><FormattedMessage id='delete'/></Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmAlert;
