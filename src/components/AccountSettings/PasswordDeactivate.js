import React from 'react'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from "react-bootstrap";
import { connect } from "react-redux"
import { resetPassword, API_ROOT, headers, closeModal } from "../../redux/actions";


class ConfirmPassword extends React.Component {

  state = {
    current_password: {
      value: "",
      validation: null,
      error: ""
    },
    disable: true
  }

  deactivateAccount = () => {
    const reason = this.props.deactivateInfos.reason
    const comment = this.props.deactivateInfos.comment
    fetch(`${API_ROOT}/deactivate_account`, {
          method: "POST",
          headers ,
          body: JSON.stringify({reason, comment})

    })
    .then(localStorage.removeItem("token"))
    window.location.href = "/";
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
    const current_password = this.state.current_password.value

    const userId = this.props.currentUserId
    switch (key) {
      case "current_password":
        if (current_password.length === 0) {
          return;
        } else if (current_password.length < 6) {
          this.renderError(
            "current_password",
            "password must be a minimum of 6 characters"
          );
        } else if (current_password.length > 32) {
          this.renderError("current_password", "password is too long");
        } else if (current_password.match(/\s/)) {
          this.renderError("current_password", "password cannot contain whitespace");
        } else {
            fetch(`${API_ROOT}/check_password`, {
                  method: "POST",
                  headers ,
                  body: JSON.stringify({current_password, userId})

            })
            .then(res => res.json())
            .then(json => {
              if (json.message === "wrong") {
                this.renderError("current_password", "password doesnt match");
              } else if (json.message === "good") {
                this.renderSuccess("current_password");
                this.setState({disable: false})
              }
            });


        }
        break;
      default:
        debugger;
    }
  }

  render = () => {
    return (
      <div className='' style={{margin: '24px'}}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup className='' validationState={this.state.current_password.validation}>
            <ControlLabel>Current password</ControlLabel>
            <div className='change-password-inputs'>
              <FormControl
                type="password"
                value={this.state.current_password.value}
                placeholder="password"
                onChange={e => this.handleChange(e, "current_password")}
                onBlur={e => {this.getValidationState(e, "current_password")}}
              />
              <FormControl.Feedback  style={{marginRight:'15%'}}/>
              <HelpBlock>{this.state.current_password.error}</HelpBlock>
            </div>
            <Button onClick={this.deactivateAccount} disabled={this.state.disable} variant="contained" color="secondary" >
              Deactivate
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  closeModal: state.closeModal,
  deactivateInfos: state.deactivateInfos
});



export default connect(mapStateToProps )(ConfirmPassword);
