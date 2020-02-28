import React from "react";
import { connect } from "react-redux";
import { newStep, signUpFinal, newMemberUsername, newMemberPassword, newMemberEmail} from "../../redux/actions";
import {FormControl, InputGroup, Button} from 'react-bootstrap';
import Searchbar from './Searchbar'
import MailOutline from '@material-ui/icons/MailOutline';
import Lock from '@material-ui/icons/Lock';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SelectAge from './SelectAge';

//FINISH THE FORM. ADD ROUTE. CREATE MEMBER. USE PAST PROPS AND STATE TO SUBMIT
//TO BACK ETC...

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: '150px'
  },
}));


class Step9 extends React.Component {

  state = {email: '',
           username: '',
           password: '',
           age: '',
           city: '',
           memberGender: '',
           genderInterest: '',
           minAge: '',
           maxAge: '',
            username: {
              value: "",
              validation: null,
              error: ""
            },
            first_name: {
              value: "",
              validation: null,
              error: ""
            },
            last_name: {
              value: "",
              validation: null,
              error: ""
            },
            password: {
              value: "",
              validation: null,
              error: ""
            },
          }

  componentWillUpdate = prevProps => {
    if (prevProps.signUpForm != this.props.signUpForm) {
      this.setState({
                      city: prevProps.signUpForm.city,
                      memberGender: prevProps.signUpForm.gender,
                      genderInterest: prevProps.signUpForm.genderInterest,
                      minAge: prevProps.signUpForm.minAge,
                      maxAge: prevProps.signUpForm.maxAge,
                      age: prevProps.signUpForm.age,
                    })
    }
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value})
    this.props.newMemberEmail(event.target.value)
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value})
    this.props.newMemberPassword(event.target.value)
  }

  handleChangeUsername = (event) => {
    this.setState({username: event.target.value})
    this.props.newMemberUsername(event.target.value)
  }


  handleChangeAge = (event) => {
    this.setState({age: event.target.value})
  }

  render() {
    if (this.props.currentStep !== 9) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return(
      <div className="form-group">
        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 center-form final-signup">
          <div className="col-sm-10 col-sm-offset-1">
            <h4 class="text-center" style={{color: 'grey'}}>
             QUICK SIGN UP
            </h4>
          </div>
          <div className="">
            <div className='col-xs-7' >
              <div className={useStyles.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <MailOutline />
                  </Grid>
                  <Grid item>
                    <TextField
                      onBlur={this.handleChangeEmail}
                      style={{width: '150px', maxWidth: '90%'}}

                      id="input-with-icon-grid-email"
                      label="My email"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="col-xs-5" style={{padding: '0'}}>
              <div className={useStyles.margin}>
                <Grid className="col-sm-4" container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      id="input-with-icon-grid"
                      label="My password"
                      onBlur={this.handleChangePassword}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div style={{marginTop: '25px'}}>
            <div className='col-xs-6' style={{paddingLeft: '0'}}>
              <div className={useStyles.margin}>
                <Grid className='col-xs-6' container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="My username"
                      onBlur={this.handleChangeUsername}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className='col-xs-6' style={{paddingLeft: '77px'}}>
              <SelectAge
                label='My age'
              />
            </div>
          </div>
          <div className='col-sm-10 col-sm-offset-1 flirt-area'>
            <Button
              variant="success"
              onClick={() => {this.props.signUpFinal(this.state)}}
            >
              START FLIRTING NOW!
            </Button>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  signUpForm: state.signUpForm
});


const mapDispatchToProps = dispatch => ({
  newStep: () => {
    dispatch(newStep());
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
  signUpFinal: (stateObject) => {
    dispatch(signUpFinal(stateObject))
  }
});

export default connect(mapStateToProps , mapDispatchToProps)(Step9);
