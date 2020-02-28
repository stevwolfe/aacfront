import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import { updateAgeSignup } from "../../redux/actions";
import { connect } from "react-redux";

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


class SelectAge extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      age: null,
      open: false
    }
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleChange = (event) => {
    this.setState({age: event.target.value})
    this.props.updateAge(event.target.value)
  }

  handleOpen = () => {
    this.setState({open: true} );
  }



  render() {
    return (
      <form autoComplete="off">
        <FormControl className={useStyles.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">{this.props.label}</InputLabel>
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



const mapDispatchToProps = dispatch => ({
  updateAge: (age) => {
    dispatch(updateAgeSignup(age));
  },
});

export default connect(null, mapDispatchToProps)(SelectAge);

