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
import { updateEye } from "../../redux/actions";


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

class EyeInfo extends React.Component {
  constructor(props) {
    super(props),
    this.state ={eyeColor: null}
  }


  componentWillMount = () => {
    console.log(this.props.userDetails, "props")
    if (this.props.userDetails.eyeColor) {
      this.setState({eyeColor: this.props.userDetails.eyeColor})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userDetails.eyeColor) {
      this.setState({eyeColor: nextProps.userDetails.eyeColor})
    }
  }

  handleChange = (event) => {
    let eyeColorInfo = event.target.value

    this.setState({ eyeColorInfo})
  }

  render() {
    return (
      <div className={useStyles.root}>
        <FormControl className={useStyles.formControl} style={{width: '100px', marginBottom: '20px'}}>
          <InputLabel  shrink={true} htmlFor="age-native-simple">Eye color</InputLabel>
          <Select
            native
            value={this.state.eyeColor}
            onChange={this.handleChange}
            inputProps={{
              name: 'Eye info',
              id: 'age-native-simple',
            }}
          onBlur={(event) => {this.props.updateEye(this.props.currentUserId, event.target.value)}}

          >
            <option value="" />
            <option value={"black"}>Black</option>
            <option value={"blue"}>Blue</option>
            <option value={"brown"}>Brown</option>
            <option value={"green"}>Green</option>
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
  updateEye: (userId,descr) => {
    dispatch(updateEye(userId,descr));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(EyeInfo);






