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
import { maritalStatus } from "../../redux/actions";


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

class MaritalStatus extends React.Component {


  constructor(props) {
    super(props),
    this.state ={maritalStatus: null}
  }


  componentWillMount = () => {
    console.log(this.props.userDetails, "props")
    if (this.props.userDetails.maritalStatus) {
      this.setState({maritalStatus: this.props.userDetails.maritalStatus})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userDetails.maritalStatus != this.props.userDetails.maritalStatus) {
      this.setState({maritalStatus: nextProps.userDetails.maritalStatus})
    }
  }

  handleChange = (event) => {
    let maritalStatus = event.target.value

    this.setState({ maritalStatus })
  }

  render() {

    return (
      <div className={useStyles.root}>
        <FormControl className={useStyles.formControl} style={{width: '145px'}}>
          <InputLabel shrink={true} htmlFor="age-native-simple">Maritas Status</InputLabel>
          <Select
            native
            value={this.state.maritalStatus}
            onChange={this.handleChange}
            inputProps={{
              name: 'Maritas Status',
              id: 'age-native-simple',
            }}
            onBlur={(event) => {this.props.updateMaritalStatus(this.props.currentUserId, event.target.value)}}
          >
            <option value="" />
            <option value={"divorced"}>Divorced</option>
            <option value={"cohabiting"}>Cohabiting</option>
            <option value={"married"}>Married</option>
            <option value={"separeted"}>Separeted</option>
            <option value={"single"}>Single</option>
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
  updateMaritalStatus: (userId,descr) => {
    dispatch(maritalStatus(userId,descr));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(MaritalStatus);

