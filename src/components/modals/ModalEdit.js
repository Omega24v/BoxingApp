import React from 'react'
import { Modal } from 'react-bootstrap'
import TimerEdit from '../timerEdit/TimerEdit';

const Modals = props => {
  const { timerName, ...rest } = props;
  return (
    <Modal className="edit-modal" {...rest} size="md" aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit {timerName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TimerEdit/>
      </Modal.Body>
    </Modal>
  )
}

export default Modals
