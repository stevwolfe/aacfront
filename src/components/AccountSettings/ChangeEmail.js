import React from 'react'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Modal
} from "react-bootstrap";
import { connect } from "react-redux"
import { resetPassword, API_ROOT, headers, updateEmail } from "../../redux/actions";
import ModalError from './ModalError'
import ModalSuccess from './ModalSuccess'

class UpdateEmail extends React.Component {

  state = {
      activation: {
      value: "",
      validation: null,
      error: ""
    },
    email: {
      value: "",
      validation: null,
      error: ""
    },
    modalVisibleError: '',
    modaleVisibleSuccess: '',
    modalMessageError: '',
    modalMessageSuccess: ''
  }

  componentWillUpdate = (prevProps) => {
    if (this.props.closeModal != prevProps.closeModal) {
      this.setState({modaleVisibleSuccess: false, modalVisibleError: false })
    }
  }

  checkActivationCode = () => {
   const token = this.state.activation.value

   fetch(`${API_ROOT}/email_update`, {
        method: "POST",
        headers,
        body: JSON.stringify({ token })
        })
    .then(res => res.json())
    .then(json => {
        if (json.error) {
          this.setState({modalVisibleError: true, modalMessageError: json.error})
        }
        if (json.message) {
          this.setState({modaleVisibleSuccess: true, modalMessageSuccess: json.message})
          this.props.updateEmail(this.state.email.value)
          const newState = { ...this.state };
          newState['email'].value = ''
          newState['email'].validation = null
          newState['activation'].value = ''
          newState['activation'].validation = null
          this.setState(newState)
        }
      }
    )
  }



  generateEmailToken = () => {
   const email = this.state.email.value

   fetch(`${API_ROOT}/email_send_token`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email})
        })
    .then(res => res.json())
    .then((json) => {
        if (json.error) {
          this.setState({modalVisibleError: true, modalMessageError: json.error})
        }
        if (json.message) {
          this.setState({modaleVisibleSuccess: true, modalMessageSuccess: json.message})
        }
      }
    )
  }

  handleResetPassword = (new_password, id) => {
    const password = new_password
    const userId = id
    fetch(`${API_ROOT}/reset_password`, {
          method: "POST",
          headers ,
          body: JSON.stringify({password, userId})
    })
  }

  handleChange = (e, target) => {
    const newState = { ...this.state };
    newState[target].value = e.target.value;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.checkForBlankFields()) {
      return;
    }
    if (this.checkForErrors()) {
      return;
    }
   this.handleResetPassword(this.state.password.value, this.props.currentUserId)
  };

  checkForBlankFields = () => {
    let errors = false
    for (let key in this.state) {
      if (!this.state[key].value) {
        this.renderError(key, "required field");
        errors = true;
      }
    }
    return errors
  }

  checkForErrors = () => {
    let errors = false
    for (let key in this.state) {
      if (this.state[key].error) {
        errors = true;
      }
    }
    return errors
  }


  renderError = (target, message) => {
    const newState = { ...this.state };
    newState[target].validation = "error";
    newState[target].error = message;
    this.setState(newState);
  };

  renderSuccess = target => {
    const newState = { ...this.state };
    newState[target].validation = "success";
    newState[target].error = "";
    this.setState(newState);
  };

  getValidationState = (e, key) => {
    const email = this.state.email.value
    const activation = this.state.activation.value;
    const userId = this.props.currentUserId
    switch (key) {
      case "email":
        function validateEmail(email)
          {
              var re = /\S+@\S+\.\S+/;
              return re.test(email);
          }
        if (email.length === 0) {
          return;
        } else if (!validateEmail(email)) {
          this.renderError("email", "email does not seem valid");
        } else if (email == this.props.currentUserEmail) {
          this.renderError("email", "email cannot be the same as the current one");
        } else {
          console.log(this.state.email, 'this.state.email')
          console.log(this.props.currentUserEmail, 'this.props.currentUserEmail')
          this.renderSuccess("email");
        }
        break;
      case "activation":
        if (activation.length === 0) {
          return;
        } else if (activation.length < 6) {
          this.renderError(
            "activation",
            "activation must be a minimum of 6 characters"
          );
        } else if (activation.match(/\s/)) {
          this.renderError("activation", "activation cannot contain whitespace");
        } else {
          this.renderSuccess("activation");
          // if (
          //   this.state.retype_password.validation === "error" &&
          //   retype_password === password
          // ) {
          //   this.renderSuccess("retype_password");
          // }
          console.log('activation success')
        }
        break;
      default:
        debugger;
    }
  }

  render = () => {
    return (
      <div className='col-sm-6 col-sm-offset-3  box-reset' style={{marginTop: '40px'}}>
        <div className='title-reset'>
          <img style={{height: '35px'}} src={require('../../assets/email.png')}/>
          <h4> CHANGE MY EMAIL ADDRESS </h4>
        </div>
        <div className='flex-reset-password' style={{marginRight: '15%', alignItems: 'center'}}>
          <h5><strong>Current email:</strong></h5>
          <p> {this.props.currentUserEmail} </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup className='flex-reset-password'   validationState={this.state.email.validation}>
            <ControlLabel>New email</ControlLabel>
            <div className='change-password-inputs'>
              <div style={{display: 'flex'}}>
                <FormControl
                  type="text"
                  value={this.state.email.value}
                  placeholder="new email"
                  onChange={e => this.handleChange(e, "email")}
                  onBlur={e => {this.getValidationState(e, "email")}}
                />
                <Button onClick={this.generateEmailToken} variant="secondary">OK</Button>
                <FormControl.Feedback style={{marginRight:'15%'}} />
              </div>
              <HelpBlock>{this.state.email.error}</HelpBlock>
            </div>
          </FormGroup>
          <FormGroup className='flex-reset-password' validationState={this.state.activation.validation}>
            <ControlLabel>Activation code</ControlLabel>
            <div className='change-password-inputs'>
              <div style={{display: 'flex'}}>
                <FormControl
                  type="text"
                  value={this.state.activation.value}
                  placeholder="password"
                  onChange={e => this.handleChange(e, "activation")}
                  onBlur={e => {this.getValidationState(e, "activation")}}
                />
                <Button onClick={this.checkActivationCode} variant="secondary">OK</Button>
                <FormControl.Feedback  style={{marginRight:'15%'}}/>
              </div>
              <HelpBlock>{this.state.activation.error}</HelpBlock>
            </div>
          </FormGroup>
        </form>
        <ModalError
          show={this.state.modalVisibleError}
          message={this.state.modalMessageError}
        />
        <ModalSuccess
          show={this.state.modaleVisibleSuccess}
          message={this.state.modalMessageSuccess}
        />
      </div>
    )

  }
}

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  currentUserEmail: state.currentUser.email,
  closeModal: state.closeModal
});

const mapDispatchToProps = dispatch => ({
  updateEmail: (newEmail) => {
    dispatch(updateEmail(newEmail))
  }
})

export default connect(mapStateToProps , mapDispatchToProps)(UpdateEmail);
