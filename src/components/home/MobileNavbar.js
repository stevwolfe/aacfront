import React from "react";
import { DropdownButton} from 'react-bootstrap'
import {MenuItem} from 'react-bootstrap'
import Badge from '@material-ui/core/Badge';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout, API_ROOT, headers } from "../../redux/actions";

class MobileNavbar extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      age: null
    }
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



  render() {
    return (
      <div className="menu-sm">
        <DropdownButton  title="Menu">
          <Link className='list-menu-sm' to="/">
             {this.props.activityNotification ? <Badge className="right-badge" color="secondary" badgeContent={this.props.activityNotification} invisible={this.state.invisibleActivity}>
                Activity
              </Badge>: "Activity"}
          </Link>
          <Link className='list-menu-sm' to="/search">
            Search
           </Link>
          <Link className='list-menu-sm' to="/chat">
           {this.props.messagesNotifications ? <Badge className="right-badge" color="secondary" badgeContent={this.props.messagesNotifications} invisible={this.state.invisibleActivity}>
              Messages
            </Badge>: "Messages"}
          </Link>
          <Link className='list-menu-sm' to='/infos'>
            Profile
          </Link>
          <Link className='list-menu-sm' to='/account_settings'>
            Settings
          </Link>
          <li className='list-menu-sm' style={{borderBottom: 'none', cursor: 'pointer'}} onClick={this.handleLogout} as="button">Logout</li>
        </DropdownButton>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    visitorsList: state.visitorsList,
    activityNotification: state.activityNotificationCounter,
    conversations: state.conversations,
    messagesNotifications: state.messagesNotificationCounter
  }
};


const mapDispatchToProps = dispatch => ({
  sendLogout: (userId) => {
    handleLogout(userId)
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(MobileNavbar);
