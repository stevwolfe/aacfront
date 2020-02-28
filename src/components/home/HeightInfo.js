import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { updateFeet, updateInches } from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));


class HeightInfo extends React.Component {
  // const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   name: 'Cat in the Hat',
  //   age: '',
  //   multiline: 'Controlled',
  //   currency: 'EUR',
  // });

  constructor(props) {
    super(props);
    this.state={
      feet: "",
      inches: ''
    }
  }

  componentDidMount = () => {
    if (this.props.userDetails.feet) {
      this.setState({height: this.props.userDetails.feet})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.feet != nextProps.userDetails.feet) {
      this.setState({feet: nextProps.userDetails.feet,
                     inches: nextProps.userDetails.inches
                    })
    }
  }

  handleChangeFeet = (event) => {
    this.setState({ feet: event.target.value})
  }

  handleChangeInches = (event) => {
    this.setState({ inches: event.target.value})
  }


  render() {
    return (
      <form className={useStyles.container} noValidate autoComplete="off" style={{marginBottom: '20px', display: 'flex'}}>
        <TextField
          style={{marginRight: '5px'}}
          id="standard-number"
          label="Feet"
          placeholder="Feet"
          type="number"
          value={this.state.feet}
          onChange={this.handleChangeFeet}
          className={useStyles.textField}
          margin="normal"
          onBlur={(event) => {this.props.updateFeet(this.props.currentUserId, event.target.value)}}
        />
        <TextField
          id="standard-number"
          label="Inches"
          placeholder="Inches"
          type="number"
          value={this.state.inches}
          onChange={this.handleChangeInches}
          className={useStyles.textField}
          margin="normal"
          onBlur={(event) => {this.props.updateInches(this.props.currentUserId, event.target.value)}}
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
  updateFeet: (userId,descr) => {
    dispatch(updateFeet(userId,descr));
  },
  updateInches: (userId,descr) => {
    dispatch(updateInches(userId,descr));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(HeightInfo);



