import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { connect } from "react-redux";
import { updateSmoker } from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class SmokerInfo extends React.Component {
  constructor(props) {
    super(props),
    this.state ={smoker: null}
  }


  componentWillMount = () => {
    console.log(this.props.userDetails, "props")
    if (this.props.userDetails.smoker) {
      this.setState({smoker: this.props.userDetails.smoker})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userDetails.smoker) {
      this.setState({smoker: nextProps.userDetails.smoker})
    }
  }

  handleChange = (event) => {
    let smoker = event.target.value

    this.setState({ smoker})
  }

  render() {
    return (
      <div className={useStyles.root}>
        <FormControl className={useStyles.formControl}>
          <InputLabel  shrink={true} htmlFor="age-native-simple">Smoker</InputLabel>
          <Select
            native
            value={this.state.smoker}
            onChange={this.handleChange}
            onBlur={(event) => {this.props.updateSmoker(this.props.currentUserId, event.target.value)}}
          >
            <option value="" />
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Select>
        </FormControl>
      </div>
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
  updateSmoker: (userId,descr) => {
    dispatch(updateSmoker(userId,descr));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(SmokerInfo);





