import React from "react";
import { Button, FormGroup, FormControl, HelpBlock, OverlayTrigger,Popover } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import { connect } from "react-redux"
import { login } from "../redux/actions";
import  EmailPassword from './PasswordSendLink'

  class PopoverT extends React.Component   {
    constructor(props) {
      super(props)
    }

    render =() => {
      return (
        <Popover {... this.props} >
          <EmailPassword />
        </Popover>
      )
    }
  }





class Login extends React.Component {
  state = {
    loading: false,
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
    error: ""
  };

  handleChange = (e, target) => {
    const newState = { ...this.state };
    newState[target].value = e.target.value;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.login(this.state.username.value, this.state.password.value);
    this.setState({loading: true})
  };

  checkForBlankFields = () => {
    let errors = false;
    for (let key in this.state) {
      if (!this.state[key].value) {
        this.renderError(key, "required field");
        errors = true;
      }
    }
    return errors;
  };

  renderError = (target, message) => {
    const newState = { ...this.state };
    newState[target].validation = "error";
    newState[target].error = message;
    this.setState(newState);
  };

  componentWillUpdate = (prevProps) => {
    if (this.props.errorLogin != prevProps.errorLogin) {
      this.setState({username: {error: prevProps.errorLogin}, loading: false});
    }
  }

  renderNormal = target => {
    const newState = { ...this.state };
    newState[target].validation = null;
    newState[target].error = "";
    this.setState(newState);
  };

  render = () => {

   return (
    <div className={this.props.active === "login" ? "login active" : "login"}>
      <Button
        style={styles.backButton}
        onClick={e => this.props.handleClick(e, "greeting")}
      >
        Back
      </Button>
      <h2 style={styles.header}>Login</h2>
      <hr />
      <form onSubmit={this.handleSubmit} style={{ textAlign: "left" }}>
        <FormGroup validationState={this.state.username.validation}>
          <FormControl
            type="text"
            value={this.state.username.value}
            placeholder="username"
            onChange={e => this.handleChange(e, "username")}
            onBlur={e => this.renderNormal("username")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.username.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.password.validation}>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="password"
            onChange={e => this.handleChange(e, "password")}
            onBlur={e => this.renderNormal("password")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.password.error}</HelpBlock>
        </FormGroup>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '15px'}}>
          <OverlayTrigger rootClose ref="trigger" trigger="click" placement="bottom" overlay={(<PopoverT/>)}>
            <img src={require('../assets/info.png')} />
          </OverlayTrigger>
        </div>
        {this.state.loading?<div style={{display: 'flex', justifyContent: 'center'}}><BeatLoader/> </div>:
          <Button  type="submit" bsStyle='primary' style={styles.loginButton} size="sm" block>
            Submit
          </Button>
        }
        <HelpBlock style={styles.error}>{this.state.error}</HelpBlock>
      </form>
    </div>
  )};
}



const styles = {
  backButton: {
    border: "none",
    left: "-15px",
    position: "absolute",
    top: "-15px"
  },
  header: {
    marginTop: "10px",
    color: 'white'
  },
  error: {
    color: "#D44946",
    textAlign: "center"
  },
  loginButton: {
    color: '#fff',
    backgroundColor: '#A663A6',
    borderColor: 'transparent'
  }
};

const mapStateToProps = state => ({
  errorLogin: state.errorLogin,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
