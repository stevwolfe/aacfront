import React from 'react'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from "react-bootstrap";
import { connect } from "react-redux"
import { resetPassword } from "../redux/actions";


class ResetPassword extends React.Component {

  state = {
      password: {
      value: "",
      validation: null,
      error: ""
    },
    retype_password: {
      value: "",
      validation: null,
      error: ""
    },
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
   console.log(this.state.password, 'password')
   console.log(this.props.match.params.id, 'token')
   this.props.resetPassword(this.state.password, this.props.match.params.id)
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
    const password = this.state.password.value;
    const retype_password = this.state.retype_password.value;
    switch (key) {
      case "password":
        if (password.length === 0) {
          return;
        } else if (password.length < 6) {
          this.renderError(
            "password",
            "password must be a minimum of 6 characters"
          );
        } else if (password.length > 32) {
          this.renderError("password", "password is too long");
        } else if (password.match(/\s/)) {
          this.renderError("password", "password cannot contain whitespace");
        } else {
          this.renderSuccess("password");
          if (
            this.state.retype_password.validation === "error" &&
            retype_password === password
          ) {
            this.renderSuccess("retype_password");
          }
        }
        break;
      case "retype_password":
        if (retype_password.length === 0) {
          return;
        } else if (retype_password !== password) {
          this.renderError("retype_password", "passwords do not match");
        } else {
          this.renderSuccess("retype_password");
        }
        break;
      default:
        debugger;
    }
  }

handleResetPassword = (newPassword) => {
  console.log(newPassword, 'new password')
}

  render = () => {
    return (
      <div className='col-sm-4 col-sm-offset-4' style={{marginTop: '100px'}}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup validationState={this.state.password.validation}>
            <ControlLabel>New password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password.value}
              placeholder="password"
              onChange={e => this.handleChange(e, "password")}
              onBlur={e => {this.getValidationState(e, "password")}}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.state.password.error}</HelpBlock>
          </FormGroup>
          <FormGroup validationState={this.state.retype_password.validation}>
            <ControlLabel>Confirm password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.retype_password.value}
              placeholder="password"
              onChange={e => this.handleChange(e, "retype_password")}
              onBlur={e => {this.getValidationState(e, "retype_password")}}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.state.retype_password.error}</HelpBlock>
          </FormGroup>
          <Button type="submit" bsStyle="primary" bsSize="large" block>
            Reset password
          </Button>
        </form>
      </div>
    )

  }
}


const mapDispatchToProps = dispatch => ({
  resetPassword: (newPassword, token) => {
    dispatch(resetPassword(newPassword, token))
  }
})

export default connect(null, mapDispatchToProps)(ResetPassword);
