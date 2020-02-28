import React from 'react'
import {
  Button,
  Modal
} from "react-bootstrap";
import { connect } from "react-redux"
import '../../../src/assets/activity.css'
import { confirmationCode } from "../../redux/actions";


class ModalActivation extends React.Component {
  state = {
    show:true,
    inputValue: "",
  }


  render() {
    console.log("activtion modal is here")
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.show}
      >
        <Modal.Body>
          <h4>Confirm your email</h4>

          <p>
            You have successfully signed up to adoptacougar.com.

            To fully validate your registration, you must enter the validation code in the confirmation email which we have sent you (<strong>{this.props.currentUser.email} </strong>). If you haven’t received this email in the next few minutes, make sure you check your spams.

            We thank you for your interest, and hope your experience on the site will be up to your expectations! 
          </p>
          <div>
            <input 
              placeholder="Activation code" 
              onChange={e => this.setState({inputValue: e.target.value})}
            />
            <Button 
              variant="success" 
              className="confirm-btn"
              onClick ={() => {this.props.confirmationCode(this.state.inputValue, this.props.currentUser.id)}}
            >Confirm</Button>
          </div>
          <p className="error-confirm"> {this.props.currentUser.errorConfirmAccount} </p>
        </Modal.Body>
      </Modal>
  );

  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
};

const mapDispatchToProps = dispatch => ({
  confirmationCode: (code, userId) => {
    dispatch(confirmationCode(code, userId))
  }
})


export default connect(mapStateToProps,mapDispatchToProps)(ModalActivation);

