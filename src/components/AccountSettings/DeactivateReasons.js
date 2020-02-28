import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { connect } from "react-redux"
import { reasonDeactivate, commentDeactivate } from "../../redux/actions";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

function RadioButtonsGroup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  function sendComment(e) {
    props.commentDeactivate(e.target.value)
  }

  function sendReason() {
    props.reasonDeactivate(value)
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Why do you wish to delete your account?
        </FormLabel>
        <RadioGroup
          aria-label="Gender"
          name="gender1"
          className={classes.group}
          value={value}
          onChange={handleChange}
          onClick={sendReason()}
        >
          <FormControlLabel  value="found" control={<Radio />} label="I have found someone who is right for me" />
          <FormControlLabel value="disapointed" control={<Radio />} label="I was disappointed by some of the services" />
          <FormControlLabel value="personal" control={<Radio />} label="For personal reasons" />
          <FormControlLabel value="nobody" control={<Radio />} label="I did not meet someone" />
          <TextareaAutosize style={{marginTop: '2'}} onBlur={sendComment} aria-label="Minimum height" rows={3} placeholder="Comments..." />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  reasonDeactivate: (reason) => {
    dispatch(reasonDeactivate(reason))
  },
  commentDeactivate: (comment) => {
    dispatch(commentDeactivate(comment))
  }
});


export default connect(null, mapDispatchToProps)(RadioButtonsGroup)
