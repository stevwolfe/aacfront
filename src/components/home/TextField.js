import React,{useEffect, useState}  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { updateDescription } from "../../redux/actions";
import { createMuiTheme } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    fontSize: '18px !important'
  },
  dense: {
    marginTop: 19,
  },
  label: {
    fontSize: '20px',
  },
  menu: {
    width: 200,
  },
}));

class TextFields extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      text: ""
    }
  }

  componentWillMount = () => {
    this.setState({text: this.props.userDetails.description})
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.text != nextProps.userDetails.description) {
      this.setState({text: nextProps.userDetails.description})
    }
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value})
  }

  render() {

    return (
      <form  className={useStyles.container} noValidate autoComplete="off" style={{ marginBottom: '25px', width: '100%'}}>
        <TextField
          style={{width:'100%'}}
          id="standard-textarea"
          label="About you"
          placeholder="Your introduction paragraph is very important. This first step should show your personality. You are not allowed to provide personal information: e-mail, phone number, website... Your introduction will be moderated by a dedicated team and will be refused if you don't respect this rule."
          multiline
          InputLabelProps={{
            shrink: true,
           }}
          className={useStyles.textField}
          value={this.state.text}
          margin="normal"
          onChange = {this.handleChange}
          onBlur={(event) => {this.props.updateDescription(this.props.currentUserId, event.target.value)}}
        />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    userDetails: state.userDetails
  }
};

const mapDispatchToProps = dispatch => ({
  updateDescription: (userId,descr) => {
    dispatch(updateDescription(userId,descr));
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(TextFields);

