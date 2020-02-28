import React from "react";
import { connect } from "react-redux";
import { getFavorites, addReceivedFavorite, resetCounterNotification, fetchVisitorsList, fetchSmilersList } from "../../redux/actions";
import MainNavbar from '../home/MainNavbar';
import TabsActivity from './TabsActivity';
import { ActionCable } from 'react-actioncable-provider';
import '../../assets/activity.css'
import { Link } from "react-router-dom";

class Activity extends React.Component {
  state = {
            modalPhotos: []
          }
  componentDidMount = () => {
    this.props.resetCounterNotification()
  }

  componentWillMount = () => {
    if (this.props.currentUserId) {
      this.props.fetchFavoriteList(this.props.currentUserId)
      // this.props.fetchVisitorsList(this.props.currentUserId)
      // .then(this.props.fetchSmilersList(this.props.currentUserId))
    }
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.currentUserId != this.props.currentUserId) {
      this.props.fetchFavoriteList(prevProps.currentUserId)
      // .then(this.props.fetchVisitorsList(prevProps.currentUserId))
      // .then(this.props.fetchSmilersList(prevProps.currentUserId))
    }
  }

  render() {
    return (
      <div>
        <MainNavbar />
        <div id="conversations_list_container">
          <TabsActivity/>
          <Link to="/admin">Admin </Link>
        </div>
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


