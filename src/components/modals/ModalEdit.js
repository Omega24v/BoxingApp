import React from 'react'
import { Modal, CloseButton } from 'react-bootstrap'
import IconClose from '../../icons/IconClose';
import TimerEdit from '../timerEdit/TimerEdit';
import './ModalEdit.sass';

const Modals = props => {
  const { timerName, ...rest } = props;
  return (
    <Modal className="edit-modal" {...rest} size="md" aria-labelledby="modal-title" centered>
      <Modal.Header>
        <Modal.Title>
          Edit {timerName}
        </Modal.Title>
        <CloseButton aria-label="Close" onClick={props.onHide}><IconClose/></CloseButton>
      </Modal.Header>
      <Modal.Body>
        <TimerEdit/>
      </Modal.Body>
    </Modal>
  )
}

export default Modals
