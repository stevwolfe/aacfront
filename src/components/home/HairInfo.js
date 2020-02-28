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
import { updateHair } from "../../redux/actions";

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

class HairInfo extends React.Component {
  constructor(props) {
    super(props),
    this.state ={hairColor: null}
  }


  componentWillMount = () => {
    console.log(this.props.userDetails, "props")
    if (this.props.userDetails.hairColor) {
      this.setState({hairColor: this.props.userDetails.hairColor})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userDetails.hairColor) {
      this.setState({hairColor: nextProps.userDetails.hairColor})
    }
  }

  handleChange = (event) => {
    let hairInfo = event.target.value

    this.setState({ hairInfo})
  }

  render() {
    return (
      <div className={useStyles.root}>
        <FormControl className={useStyles.formControl} style={{marginBottom: '20px'}}>
          <InputLabel  shrink={true} htmlFor="age-native-simple">Hair color</InputLabel>
          <Select
            native
            value={this.state.hairColor}
            onChange={this.handleChange}
            onBlur={(event) => {this.props.updateHair(this.props.currentUserId, event.target.value)}}
          >
            <option value="" />
            <option value={"black"}>Black</option>
            <option value={"blond"}>Blond</option>
            <option value={"brown"}>Brown</option>
            <option value={"grey"}>Grey/White</option>
            <option value={"red"}>Red</option>
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
  updateHair: (userId,descr) => {
    dispatch(updateHair(userId,descr));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(HairInfo);



