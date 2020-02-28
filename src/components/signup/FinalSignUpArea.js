import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from "react-bootstrap";
import { connect } from "react-redux";
import { API_ROOT, signUpFinal, newMemberUsername, newMemberEmail,newMemberPassword, updateAgeSignup } from "../../redux/actions";


const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: token
};


class Signup extends React.Component {
  state = {
    username: {
      value: "",
      validation: null,
      error: ""
    },
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
    age: {
      value: "",
      validation: null,
      error: ""
    },
    email: {
      value: "",
      validation: null,
      error: ""
    },
  };

  // componentWillUpdate = prevProps => {
  //   if (prevProps.signUpForm != this.props.signUpForm) {
  //     this.setState({
  //                     city: prevProps.signUpForm.city,
  //                     memberGender: prevProps.signUpForm.gender,
  //                     genderInterest: prevProps.signUpForm.genderInterest,
  //                     minAge: prevProps.signUpForm.minAge,
  //                     maxAge: prevProps.signUpForm.maxAge,
  //                     age: prevProps.signUpForm.age,
  //                   })
  //   }
  // }

  handleChangeEmail = (event) => {
    this.props.newMemberEmail(event.target.value)
  }

  handleChangePassword = (event) => {
    this.props.newMemberPassword(event.target.value)
  }

  handleChangeUsername = (event) => {

    this.props.newMemberUsername(event.target.value)
  }


  handleChangeAge = (event) => {
    this.props.updateAge(event.target.value)
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
    this.props.signUpFinal(this.props.signUpForm)
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

  capitalize = (target, name) => {
    const arr = name.split("");
    arr[0] = arr[0].toUpperCase();
    const capName = arr.join("");
    const newState = { ...this.state };
    newState[target].value = capName;
    this.setState(newState);
  };

  getValidationState = (e, key) => {
    const username = this.state.username.value;
    // const first_name = this.state.first_name.value;
    const email = this.state.email.value;
    const age = this.state.age.value;
    const password = this.state.password.value;
    const retype_password = this.state.retype_password.value;
    switch (key) {
      case "username":
        if (username.length === 0) {
          return;
        } else if (username.length < 3) {
          this.renderError("username", "username is too short");
        } else if (username.length > 16) {
          this.renderError("username", "username is too long");
        } else {
          fetch(`${API_ROOT}/search/users/exact/${username}`)
            .then(res => res.json())
            .then(json => {
              if (json.message === "taken") {
                this.renderError("username", "username is already taken");
              } else if (json.message === "available") {
                this.renderSuccess("username");
              }
            });
        }
        break;
      case "age":
        if (age.length === 0) {
          return;
        } else if (age < 18) {
          this.renderError("age", "Sorry but we only accept member of 18+ years old");}
        else {
          this.renderSuccess("age");
        }
        break;
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
          fetch(`${API_ROOT}/search/users/email/`, {
            method: "POST",
            headers,
            body: JSON.stringify({ email })
          })
            .then(res => res.json())
            .then(json => {
              if (json.message === "taken") {
                this.renderError("email", "email already associated to an account");
              } else if (json.message === "available") {
                this.renderSuccess("email");
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
  };

  render = () => (
    <div className="signup">
      <hr />
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <FormGroup validationState={this.state.username.validation}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username.value}
            placeholder="jdoe"
            onChange={e => {this.handleChange(e, "username"), this.handleChangeUsername(e)}}
            onBlur={e => this.getValidationState(e, "username")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.username.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.email.validation}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email.value}
            placeholder="jdoe"
            onChange={e => {this.handleChange(e, "email"), this.handleChangeEmail(e)}}
            onBlur={e => this.getValidationState(e, "email")}
          />
          <FormControl.Feedback style={{top: '25px !important'}}/>
          <HelpBlock>{this.state.email.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.age.validation}>
          <ControlLabel>
            Age
          </ControlLabel>
          <FormControl
            type='number'
            as="select"
            onBlur={e => this.handleChangeAge(e)}
            value={this.state.age.value}
            onChange={e => {this.handleChange(e, "age")}}
            onBlur={e => {this.getValidationState(e, "age")}}

          >
          </FormControl>
          <FormControl.Feedback />
          <HelpBlock>{this.state.age.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.password.validation}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="password"
            onChange={e => this.handleChange(e, "password")}
            onBlur={e => {this.getValidationState(e, "password"), this.handleChangePassword(e)}}
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
        <Button type="submit" bsStyle="success" bsSize="large" block>
          START FLIRTING NOW!
        </Button>
      </form>
    </div>
  );
}

const styles = {
  backButton: {
    border: "none",
    left: "5px",
    position: "absolute",
    top: "5px"
  },
  form: {
    textAlign: "left"
  },
  header: {
    marginTop: "10px"
  }
};

const mapStateToProps = state => ({
  signUpForm: state.signUpForm
});

const mapDispatchToProps = dispatch => ({
  signUpFinal: params => {
    dispatch(signUpFinal(params));
  },
  newMemberPassword: (password) => {
    dispatch(newMemberPassword(password))
  },
  newMemberUsername: (username) => {
    dispatch(newMemberUsername(username))
  },
  newMemberEmail: (email) => {
    dispatch(newMemberEmail(email))
  },
  updateAge: (age) => {
    dispatch(updateAgeSignup(age));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
