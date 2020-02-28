import React from 'react'
import {
  Button,
  Modal
} from "react-bootstrap";
import '../../../src/assets/activity.css'
import { connect } from "react-redux";
import { hideModalNoMessageaRemaining} from "../../redux/actions";


class NoRemainingMessages extends React.Component {

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.showModal}
      >
        <Modal.Body>
          <p>
            You have exceeded the number of messages you can send today.
          </p>
          <p> Become a member and join our great community </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.hideModalNoMessageaRemaining()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );

  }
}

const mapStateToProps = state => ({
  showModal: state.modalNoMessagesRemaining
});

const mapDispatchToProps = dispatch => ({
  hideModalNoMessageaRemaining: () => {
    dispatch(hideModalNoMessageaRemaining())
  }
})

export default connect(mapStateToProps , mapDispatchToProps)(NoRemainingMessages);
