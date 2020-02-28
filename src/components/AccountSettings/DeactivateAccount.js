import React from "react";
import { connect } from "react-redux";
import { getFavorites, addReceivedFavorite, resetCounterNotification, fetchVisitorsList, fetchSmilersList } from "../../redux/actions";
import MainNavbar from '../home/MainNavbar';
import { ActionCable } from 'react-actioncable-provider';
import '../../assets/accountsettings.css'
import DeactivateReasons from './DeactivateReasons'
import PasswordDeactivate from './PasswordDeactivate'


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
      <div className=''>
        <MainNavbar />
        <div className="col-sm-8 col-sm-offset-1 box-reset" style={{marginTop: '50px'}}>
          <h4> My account </h4>
          <DeactivateReasons />
          <p style={{marginLeft: '24px'}}>
            Do you have any questions? Would you like our team to help you solve an issue you are having with the website? You can contact our customer services.
          </p>
          <p style={{marginLeft: '24px'}}>
            Are you sure that you want to deactivate your account?*
          </p>
          <PasswordDeactivate />
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

})


export default connect(mapStateToProps,mapDispatchToProps)(Activity);


