import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import TimerEdit from '../timerEdit/TimerEdit';
import './ModalEdit.sass'


const Modals = props => {
  
  return (
    <Modal className="edit-modal" {...props} size="lg" aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Timer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TimerEdit/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Modals
