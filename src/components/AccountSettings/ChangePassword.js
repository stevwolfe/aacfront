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
    current_password: {
      value: "",
      validation: null,
      error: ""
    },
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
    const current_password = this.state.current_password.value
    const password = this.state.password.value;
    const retype_password = this.state.retype_password.value;
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
              }
            });


        }
        break;
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

  render = () => {
    return (
      <div className='col-sm-6 col-sm-offset-3 box-reset' style={{marginTop: '100px'}}>
        <div className='title-reset'>
          <img style={{height: 35}} src={require('../../assets/key.png')}/>
          <h4> CHANGE PASSWORD</h4>
        </div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup className='flex-reset-password' validationState={this.state.current_password.validation}>
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
          </FormGroup>
          <FormGroup className='flex-reset-password' validationState={this.state.password.validation}>
            <ControlLabel>New password</ControlLabel>
            <div className='change-password-inputs'>
              <FormControl
                type="password"
                value={this.state.password.value}
                placeholder="password"
                onChange={e => this.handleChange(e, "password")}
                onBlur={e => {this.getValidationState(e, "password")}}
              />
              <FormControl.Feedback  style={{marginRight:'15%'}}/>
              <HelpBlock>{this.state.password.error}</HelpBlock>
              <HelpBlock>{this.state.password.error}</HelpBlock>
            </div>
          </FormGroup>
          <FormGroup className='flex-reset-password' validationState={this.state.retype_password.validation}>
            <ControlLabel>Confirm password</ControlLabel>
            <div className='change-password-inputs'>
              <FormControl
                type="password"
                value={this.state.retype_password.value}
                placeholder="password"
                onChange={e => this.handleChange(e, "retype_password")}
                onBlur={e => {this.getValidationState(e, "retype_password")}}
              />
              <FormControl.Feedback  style={{marginRight:'15%'}}/>
              <HelpBlock>{this.state.retype_password.error}</HelpBlock>
            </div>
          </FormGroup>
          <Button className='flex-reset-password-btn' type="submit" variant="secondary" >
            Reset
          </Button>
        </form>
      </div>
    )

  }
}

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  closeModal: state.closeModal
});

// const mapDispatchToProps = dispatch => ({
//   resetPassword: (newPassword, token) => {
//     dispatch(resetPassword(newPassword, token))
//   }
// })

export default connect(mapStateToProps , null)(ResetPassword);
