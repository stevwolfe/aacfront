import React from 'react'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from "react-bootstrap";
import { connect } from "react-redux"
import { forgotPassword } from "../redux/actions";


class EmailPassword extends React.Component {

  state = {
      email: {
      value: "",
      validation: null,
      error: ""
    }
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
   this.props.forgotPassword(this.state.email.value)
   const newState = { ...this.state };
   newState['email'].error = "Check your email for reset link";
   this.setState(newState);

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
    const email = this.state.email.value;
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
        } else {
          this.renderSuccess("email");
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
      <div>
        <form onSubmit={this.handleSubmit}>
        <FormGroup validationState={this.state.email.validation}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email.value}
            placeholder="jdoe"
            onChange={e => {this.handleChange(e, "email")}}
            onBlur={e => this.getValidationState(e, "email")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.email.error}</HelpBlock>
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
  forgotPassword: (email) => {
    dispatch(forgotPassword(email))
  }
})

export default connect(null, mapDispatchToProps)(EmailPassword);
