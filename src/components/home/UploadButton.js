import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div>
      <label htmlFor="contained-button-file">
        <Link to="/photos">
          <Button variant="contained" component="span" className={classes.button}>
            Upload Photos
          </Button>
        </Link>
      </label>
    </div>
  )
}
