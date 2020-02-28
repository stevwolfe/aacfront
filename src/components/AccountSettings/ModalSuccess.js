import React from 'react'
import {
  Button,
  Modal
} from "react-bootstrap";
import { connect } from "react-redux"
import { closeModal } from "../../redux/actions";


function SuccessModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
        <div className='modal-error'>
          <img src={require('../../assets/success.png')} />
          <p>
            {props.message}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {props.closeModal()}}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
});

export default connect(null, mapDispatchToProps)(SuccessModal)
