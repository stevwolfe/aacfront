import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { updateDistance} from "../../redux/actions";
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

class MaxRadius extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      distance: 50
    }
  }

  componentDidMount = () => {
    if (this.props.currentMaxRadius) {
      this.setState({distance: this.props.currentMaxRadius})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentMaxRadius != this.props.currentMaxRadius) {
      this.setState({age: nextProps.currentMaxRadius})
    }
  }

  handleChange = (event) => {
    let distance = event.target.value
    this.setState({distance})
    this.props.updateDistance( distance)
  }


  render() {
    return (
      <form className={useStyles.container} noValidate>
        <FormControl  className={useStyles.formControl}>
          <InputLabel shrink={true} htmlFor="age-simple">Distance</InputLabel>
          <Select
            // onBlur={(event) => {this.props.updateBirthday(this.props.currentUserId, event.target.value)}}
            value={this.state.distance}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="5">
              <em>5 miles</em>
            </MenuItem>
            <MenuItem value="10">
              <em>10 miles</em>
            </MenuItem>
            <MenuItem value="20">
              <em>20 miles</em>
            </MenuItem>
            <MenuItem value="50">
              <em>50 miles</em>
            </MenuItem>
            <MenuItem value="100">
              <em>100 miles</em>
            </MenuItem>
            <MenuItem value="150">
              <em>150 miles</em>
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentMaxRadius: state.currentUser.maxRadius,
    userDetails: state.userDetails
  }
};

const mapDispatchToProps = dispatch => ({
  updateDistance: (distance) => {
    dispatch(updateDistance(distance));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(MaxRadius);



