import React, {Fragment} from 'react';
import { getPhotos, fetchCurrentUser, resetPhotos, addModalPhoto, makePrimary } from "../../redux/actions";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import ImportPhotos from './ImportPhotos'
import UploadButton from '../home/UploadButton'

class ProfilePicture extends React.Component {

  state= {
    photo: "",
    loading: false,
    currentUser: "",

  }



  componentDidMount() {
    if (this.props.currentUser.photo) {
      this.setState({photo: this.props.currentUser.photo})
    }
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.currentUser.photo != this.props.currentUser.photo) {
      this.setState({photo: nextProps.currentUser.photo})
    }

  };

  render (){

    if (!this.state.photo) {
      return (
      <div className="flex-box-infos">
        <h3>{this.props.currentUser.username} </h3>
        <img style={{height: '230px', width: '230px', boderRadius: '5px'}} src={require("../../assets/blank-picture.png")} />
        <UploadButton />
      </div>
      )
    }
    else {
      return (
        <div className="flex-box-infos">
          <h3 style={{marginTop: '10px'}}>{this.props.currentUser.username} </h3>
          <img style={{height: '230px', width: '230px', boderRadius: '5px'}} src={this.state.photo} />
          <UploadButton />
        </div>
      )
    }
  }
}


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    showPublicPhotos: state.showPublicPhotos,
    loading: state.loader.loading,
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = dispatch => ({
  getPhotos: userId => {
    dispatch(getPhotos(userId));
  },
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
  resetPhotos: () => {
    dispatch(resetPhotos())
  },
  addModalPhoto: (photos, index) => {
    dispatch(addModalPhoto(photos,index))
  },
  makePrimary: (userId, photoId) => {
    dispatch(makePrimary(userId, photoId))
  }
})



export default connect(mapStateToProps,mapDispatchToProps )(ProfilePicture);
