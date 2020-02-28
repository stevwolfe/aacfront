import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter, Link } from "react-router-dom";
// import ChatAreaContainer from "./ChatAreaContainer";
// import Welcome from "./Welcome";
import Badge from '@material-ui/core/Badge';
import {fetchCurrentUser, addNotificationsToMessages, addNotificationsSmileysTab, addNotificationsVisitorsTab, fetchConversations, addNewConversation} from "../../redux/actions";
import { ActionCable } from 'react-actioncable-provider';
import {Navbar} from 'react-bootstrap'
import '../../assets/navbar.css'
import UpgradeMembership from './UpgradeMembership'
import ProfileNav from './ProfileNav'
import OnlineStatus from './OnlineStatus'
import MobileNavbar from './MobileNavbar'

class MainNavbar extends React.Component {
  state = {
    invisibleActivity: false,
    open: true,
    currentUserId: "",
    conversations: []
  }


  componentDidMount = () => {
    if (this.state.conversations.length == 0 && this.props.currentUserId && !this.props.conversations.length) {
      // this.props.fetchConversations(this.props.currentUserId)
    }
   if (this.props.currentUserId) {
      this.setState({currentUserId: this.props.currentUserId})
    }
   if (this.props.conversations) {
      this.setState({conversations: this.props.conversations})
    }
    if (!this.props.currentUserId) {
      this.props.fetchCurrentUser()
    }
  }

  componentWillUpdate = (prevProps) => {
    if (this.props.currentUserId != prevProps.currentUserId) {
      this.setState({currentUserId: prevProps.currentUserId})
      this.props.fetchConversations(prevProps.currentUserId)
    }
    if (this.props.conversations != prevProps.conversations) {
      this.setState({conversations: prevProps.conversations})
    }
  }

  handleReceivedSmileys = (response) => {
    this.props.addNotificationsSmileysTab(response.smiley.user)
  }

  handleReceivedVisitor = (response) => {
    this.props.addNotificationsVisitorsTab(response.visitor.user)
  }
  render = () => {
    let newConversationCable;
    let newMessageCable;
    console.log(this.props.messagesNotifications, 'messages')
    console.log(this.props.activityNotification, 'activity')
    if (this.state.currentUserId) {
      return (
      <div id="App">
          <ActionCable
            channel={{
              channel: "VisitorsChannel",
              user: this.state.currentUserId
            }}
            onReceived={response => {
              this.handleReceivedVisitor(response)
            }}
          />
          <ActionCable
            channel={{
              channel: "SmileysChannel",
              user: this.state.currentUserId
            }}
            onReceived={response => {
              this.handleReceivedSmileys(response)
            }}
          />
          {window.location.pathname != "/chat"?
          this.state.conversations.map( c =>
            <ActionCable
            ref={node => {
              newMessageCable = node;
            }}
            channel={{
              channel: "ConversationChannel",
              conversation: c.id
            }}
            onReceived={response => {
             var isMacSafari = window.safari !== undefined && !!window.navigator.platform.match(/Mac/);
             // if (!isMacSafari) {
              let audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
              audio.play().then(function () {

              }).catch(function (reason) {
                console.log('caught error');
              });
            // }



              this.props.addNotificationsToMessages()
            }}
          />) : null
          }
          {window.location.pathname != "/chat"?
            <ActionCable
            channel={{
              channel: "NewConversationChannel",
              user: this.props.currentUserId
            }}
            onReceived={response => {
              this.props.addNewConversation(response)
            }}
          />: null
        }
        <Navbar bg="light" className="row nav-flex" style={{zIndex: '1'}}>
          <div className="col-sm-2">
            <Navbar.Brand>
              <Link to="/" style={{padding:0, marginLeft: '10px'}}>
                <img className="logo-nav" src={require('../../assets/logo_b&w.jpeg')} />
              </Link>
             </Navbar.Brand>
          </div>
          <div className='col-xs-6 small-nav'>
            {
             this.props.messagesNotifications && this.props.activityNotification?
                <Badge className="right-badge menu-badge" color="secondary" badgeContent={this.props.messagesNotifications + this.props.activityNotification} invisible={this.state.invisibleActivity}>
                  <MobileNavbar/>
                </Badge>: null
            }
            {
             (this.props.messagesNotifications || this.props.activityNotification) && !(this.props.messagesNotifications && this.props.activityNotification )?
              this.props.messagesNotifications?
                <Badge className="right-badge menu-badge" color="secondary" badgeContent={this.props.messagesNotifications} invisible={this.state.invisibleActivity}>
                  <MobileNavbar/>
                </Badge>
                :<Badge className="right-badge menu-badge" color="secondary" badgeContent={this.props.activityNotification} invisible={this.state.invisibleActivity}>
                  <MobileNavbar/>
                </Badge>
              :null
            }
            {
             !this.props.messagesNotifications && !this.props.activityNotification?
               <MobileNavbar/>: null
            }

          </div>
          <div className="nav-xl col-sm-6 ">
            <div className="flex-menu">
              <Navbar.Brand>
                  <Link to="/">
                   {this.props.activityNotification ? <Badge className="right-badge" color="secondary" badgeContent={this.props.activityNotification} invisible={this.state.invisibleActivity}>
                      Activity
                    </Badge>: "Activity"}
                  </Link>
              </Navbar.Brand>
              <Navbar.Brand><Link to="/search">Search </Link></Navbar.Brand>
              <Navbar.Brand>
                <Link to="/chat">
                   {this.props.messagesNotifications ? <Badge className="right-badge" color="secondary" badgeContent={this.props.messagesNotifications} invisible={this.state.invisibleActivity}>
                      Messages
                    </Badge>: "Messages"}
                </Link>
              </Navbar.Brand>
                <Navbar.Brand className="profile-nav">
                  <ProfileNav/>
                </Navbar.Brand>
              </div>
          </div>
          <div className="membership-button col-sm-4">
            <div>
              <Navbar.Brand>
                <Link to="/subscription">
                  <UpgradeMembership />
                </Link>
              </Navbar.Brand>
            </div>
          </div>
        </Navbar>
      </div>
    );
    } else {return <div/>}
  };
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
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
  addNotificationsVisitorsTab: (newVisitor) => {
    dispatch(addNotificationsVisitorsTab(newVisitor))
  },
  addNotificationsSmileysTab: (newVisitor) => {
    dispatch(addNotificationsSmileysTab(newVisitor))
  },
  fetchConversations: userId => {
    dispatch(fetchConversations(userId));
  },
  addNewConversation: convo => {
    dispatch(addNewConversation(convo))
  },
  addNotificationsToMessages: () => {
    dispatch(addNotificationsToMessages())
  }
})


export default connect(mapStateToProps,mapDispatchToProps)(MainNavbar);
