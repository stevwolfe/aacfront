import React from "react";
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { getFavorites, addReceivedFavorite, resetCounterNotification, fetchVisitorsList, fetchSmilersList } from "../../redux/actions";
import MainNavbar from '../home/MainNavbar';
import { ActionCable } from 'react-actioncable-provider';
import '../../assets/accountsettings.css'
import ResetPassword from './ChangePassword'
import EmailUpdate from './ChangeEmail'

class Activity extends React.Component {
  state = {
            modalPhotos: []
          }
  componentDidMount = () => {
    this.props.resetCounterNotification()
  }

  componentWillMount = () => {
    if (this.props.currentUserId) {
      // this.props.fetchFavoriteList(this.props.currentUserId)

    }
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.currentUserId != this.props.currentUserId) {
      // this.props.fetchFavoriteList(prevProps.currentUserId)
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection:'column'}}>
        <MainNavbar />
        <div id="conversations_list_container">
          <ResetPassword />
          <EmailUpdate />
        </div>
        <Link style={{marginTop: '35px',marginBottom: '35px',color: '#DB7093'}}className="col-sm-offset-3 " to='/deactivate'> Deactivate </Link>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    visitorsList: state.visitorsList
  }
};

const mapDispatchToProps = dispatch => ({
  fetchFavoriteList: (userId) => {
    dispatch(getFavorites(userId))
  },
  addToFavoriteList: (newFav) => {
    dispatch(addReceivedFavorite(newFav))
  },
  resetCounterNotification: () => {
    dispatch(resetCounterNotification())
  },
  // fetchVisitorsList: (userId) => {
  //   dispatch(fetchVisitorsList(userId))
  // },
  // fetchSmilersList: (userId) => {
  //   dispatch(fetchSmilersList(userId))
  // }
})


export default connect(mapStateToProps,mapDispatchToProps)(Activity);


