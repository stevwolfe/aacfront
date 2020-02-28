import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { updateAge} from "../../redux/actions";
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash';



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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

class DatePickers extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      age: 18
    }
  }

  componentDidMount = () => {
    if (this.props.currentUserAge) {
      this.setState({age: this.props.currentUserAge})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentUserAge != this.props.currentUserAge) {
      this.setState({age: nextProps.currentUserAge})
    }
  }

  handleChange = (event) => {
    let age = event.target.value
    this.props.updateAge( event.target.value)
  }


  render() {
    return (
      <form className={useStyles.container} noValidate style={{marginBottom: '25px'}}>
        <FormControl  className={useStyles.formControl}>
          <InputLabel shrink={true} htmlFor="age-simple">Age</InputLabel>
          <Select
            // onBlur={(event) => {this.props.updateBirthday(this.props.currentUserId, event.target.value)}}
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            { _.range(18, 80).map(value =>
                <MenuItem value={value}>
                  <em>{value}</em>
                </MenuItem>)
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserAge: state.currentUser.age,
    userDetails: state.userDetails
  }
};

const mapDispatchToProps = dispatch => ({
  updateAge: (age) => {
    dispatch(updateAge(age));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(DatePickers);
