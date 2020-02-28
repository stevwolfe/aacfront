import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter, Link } from "react-router-dom";
import ChatAreaContainer from "./chat/ChatAreaContainer";
import Welcome from "./Welcome";
import MainNavbar from "./home/MainNavbar";
import { fetchCurrentUser, noToken, fetchConversations, fetchNewNotification } from "../redux/actions";
import EditInfo from './infos/EditInfo'
import Photos from './infos/Photos'
import HomeSearch from './search/HomeSearch'
import MemberShow from './member/MemberShow'
import Activity from './activity/Activity'
import Subscription from './subscription/Subscription'
import { ActionCable } from 'react-actioncable-provider';
import SignupForm from './signup/SignupForm'
import ResetPassword from './ResetPasswordPage'
import AccountSettings from './AccountSettings/AccountSettings'
import DeactivateAccount from './AccountSettings/DeactivateAccount'
import ChatAno from './chatano/ChatAreaContainer'
import AutoLogout from './AutoLogout'
import ModalActivation from './confirmation/ModalActivation'

class App extends React.Component {
  componentWillMount = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.fetchCurrentUser();
    } else {
      this.props.noToken();
      console.log('no token')
    }
  };

  // componentDidMount = () => {
  //   let audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
  //   let allAudios = []
  //   allAudios.push(audio)
  //   document.body.addEventListener('touchstart', function() {
  //     if(audio) {
  //       audio.play()
  //       audio.pause()
  //       audio.currentTime = 0
  //     }
  //   }, false)
  // }

  componentWillUpdate = (prevProps) => {
    if (prevProps.currentUserId != this.props.currentUserId) {
      let lastLogin = new Date(prevProps.currentUser.lastLogin).getTime()
      let dateNow = new Date().getTime()
      let timeDif =  (dateNow - lastLogin) / 60000
      console.log(timeDif, 'time difference')
      if (window.location.pathname != "/chat" && window.location.pathname != "/admin") {
        this.props.fetchConversations(prevProps.currentUserId)
      }
      if (timeDif < 0.1) {
      this.props.fetchNewNotification(prevProps.currentUserId)
      }
    }
  }

  render = () => {
           
    return (
      <div id="App">
        <Route
          exact
          path="/"
          render={() => {
            if (this.props.loading) {

              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              if (!this.props.currentUser.confirmedAccount) {
                return (
                  <div>
                    <Activity />
                    <ModalActivation /> 
                  </div>
                )
              } else {
                return (<Activity />)}
            } else if (this.props.errorLogin) {
              return (
                <div />
              );
            }
            else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />
        <Route
          exact
          path="/subscription"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <Redirect to="/subscription" />

            } else {
              return <Redirect to="/" />;
            }
          }
        }
        />
        <Route
          exact
          path="/chat"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <ChatAreaContainer />


            } else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />
        <Route
          exact
          path="/photos"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <Redirect to="/photos" />

            } else {
              return <Redirect to="/" />;
            }
          }
        }
        />
        <Route
          exact
          path="/search"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <Redirect to="/search" />

            } else {
              return <Redirect to="/" />;
            }
          }
        }
        />
        <Route
          exact
          path="/deactivate"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <Redirect to="/deactivate" />

            } else {
              return <Redirect to="/" />;
            }
          }
        }
        />
        <Route
          exact
          path="/infos"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <EditInfo />


            } else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />
        <Route
          exact
          path="/photos"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <Photos />


            } else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />
        <Route
          exact
          path="/search"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <HomeSearch />


            } else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />
        <Route
          exact
          path="/change_password/:id"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <ResetPassword />


            } else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />
        <Route
          exact
          path="/account_settings"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <AccountSettings />


            } else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />
        <Route
          exact
          path="/deactivate"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <DeactivateAccount />


            } else {
              return <Redirect to="/welcome" />;
            }
          }
        }
        />

        <Route exact path="/welcome" component={Welcome} />
        <Route path="/member/:id" component={MemberShow} />
        <Route path="/subscription" component={Subscription} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/admin" component={ChatAno} />
        {this.props.loggedIn? <AutoLogout />:null}

      </div>
    );
  };
}

const mapStateToProps = state => ({
  loggedIn: state.isLoggedIn,
  loading: state.currentUser.loading,
  userDetails: state.userDetails,
  currentUserId: state.currentUser.id,
  conversations: state.conversations,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  },
  noToken: () => {
    dispatch(noToken());
  },
  fetchConversations: (userId) => {
    dispatch(fetchConversations(userId))
  },
  fetchNewNotification: (userId) => {
    dispatch(fetchNewNotification(userId))
  },
  // fetchConversations: (userId) => {
  //   dispatch(fetchConversations(userId))
  // }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
