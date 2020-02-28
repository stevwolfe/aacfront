import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import { connect } from "react-redux";
import { updateMaxAge } from "../../redux/actions";


const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

class MaxAge extends React.Component {

  // const [age, setAge] = React.useState('');
  // const [open, setOpen] = React.useState(false);

  constructor(props) {
    super(props);
    this.state ={
      age: null,
      open: false
    }
  }


  componentWillMount = () => {
    if (this.props.currentUser.minAge) {
      this.setState({age: this.props.currentUser.maxAge})
    }
  }

  handleChange = (event) => {
    this.props.updateMaxAge( event.target.value, this.props.currentUser.id, this.props.currentUser.minAge)
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.currentUser.maxAge != this.state.age) {
      this.setState({age: this.props.currentUser.maxAge})
    }
  }

  handleClose = () => {
    this.setState({open: false});
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.age <= nextProps.minAge) {
      this.setState({age: nextProps.minAge + 1})
      this.props.updateMaxAge(nextProps.minAge + 1, this.props.currentUser.id)
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }
  render() {
    return (
      <form autoComplete="off">
        <FormControl className={useStyles.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Max Age</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'demo-controlled-open-select',
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

const mapStateToProps = state => ({
  minAge: state.minAge,
  currentUser: state.currentUser
});


const mapDispatchToProps = dispatch => ({
  updateMaxAge: (maxAge, userId, minAge) => {
    dispatch(updateMaxAge(maxAge, userId, minAge));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MaxAge);

