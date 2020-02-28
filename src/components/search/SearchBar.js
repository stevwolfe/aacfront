import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxSearchBar from './CheckBoxSearchBar'
import SelectMinAge from './SelectMinAge';
import SelectMaxAge from './SelectMaxAge';
import { filterName } from "../../redux/actions";
import { connect } from "react-redux";
import DistanceComponent from './DistanceComponent'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  colorPrimary: {
    backgroundColor: 'green'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#B0B0B0', 0.15),
    '&:hover': {
      backgroundColor: fade('#B0B0B0', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function SearchBar(props) {
  const classes = useStyles();


  return (
    <div class="toolbar-search">
      <AppBar position="static" style={{ backgroundColor: '#F5F5F5', color: 'black', Zindex: '-1 !important' }}>
        <Toolbar style={{ display: 'flex', justifyContent:'space-around'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <SelectMinAge label='Min age'/>
            <SelectMaxAge/>
            <div style={{marginLeft: '20px'}}>
              <CheckBoxSearchBar/>
            </div>
            <div style={{marginLeft: '20px'}}>
              <DistanceComponent />
            </div>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search by Name"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
              onChange={(event) => {props.filterName(event.target.value)}}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapDispatchToProps = dispatch => ({
  filterName: (letters) => {
    dispatch(filterName(letters))
  }
});

export default connect(null, mapDispatchToProps)(SearchBar);

