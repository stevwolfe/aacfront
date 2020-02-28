import React from 'react';
import {Row, Col, Dropdown} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../../../src/assets/navbar.css'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { handleLogout, API_ROOT, headers } from "../../redux/actions";
import OnlineStatus from './OnlineStatus'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    zIndex: 10,
    position: 'absolute',
    top: 40,
    right: 0,
    left: 0,
    padding: 10,
  },
  fake: {
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing(3),
    },
  },
}));

class ProfileNav extends React.Component   {

  state={
    open: false
  }

  handleLogout = () => {
    const userId = this.props.currentUser.id
    fetch(`${API_ROOT}/logout`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(localStorage.removeItem("token"))
    window.location.href = "/";
  }


  handleClick = () => {
    this.setState({open: !this.state.open})
  };

  handleClickAway = () => {
    this.setState({open: false})
  };

  render = () => {
    return (
      <div style={{ width: '150px', cursor: 'pointer', zIndex:'9999'}}>
        <div class="profile-avatar">
          {this.props.currentUser.photo?
            <div  style={{position: 'relative', alignItems: 'center', display: 'flex'}}>
              <img onClick={this.handleClick} src={this.props.currentUser.photo} />
              <img onClick={this.handleClick} className="arrow" src={require('../../assets/down-arrow.png')} />
              <OnlineStatus />
            </div>:
            <div  style={{position: 'relative', alignItems: 'center', display: 'flex'}}>
              <img onClick={this.handleClick} src={require('../../assets/blank-picture.png')} />
              <img onClick={this.handleClick} className='img-profile-blank' src={require('../../assets/exclamation-button.png')} />
              <img onClick={this.handleClick} className="arrow" src={require('../../assets/down-arrow.png')} />
              <OnlineStatus />
            </div>

          }
          </div>
            <div className="">
              {this.state.open?
                <ul class='list-profile'>
                  <Link to='/infos'><li className="border">My Profile</li></Link>
                  <Link to='/account_settings'><li className="border">Account Settings</li></Link>
                  <li onClick={this.handleLogout} style={{borderBottom:'none'}}>Logout</li>
                 </ul>
                :null
              }
            </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
};

const mapDispatchToProps = dispatch => ({
  sendLogout: (userId) => {
    handleLogout(userId)
  },
})


export default connect(mapStateToProps, mapDispatchToProps )(ProfileNav);
