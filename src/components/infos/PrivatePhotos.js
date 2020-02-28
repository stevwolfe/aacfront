import React, {Fragment} from 'react';
import { getPhotos,
          fetchCurrentUser,
          resetPhotos,
          addModalPhoto } from "../../redux/actions";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import ImportPhotos from './ImportPhotos'


class DisplayPrivatePhotos extends React.Component {

  state= {
    photos: [],
    loading: false,
    currentUser: "",
  }

  componentWillUnmount() {
    this.props.resetPhotos()
  }

  componentWillReceiveProps = (nextProps) => {

    let privatePhotos = []
    if (nextProps.showPublicPhotos) {
      nextProps.showPublicPhotos.map(photo => {
        if (photo.private) {
          privatePhotos.push(photo)
        }
      })
    }

    this.setState( {
                     photos: privatePhotos,
                     loading: nextProps.loading,
                     currentUser: nextProps.currentUserId
                   })

    if (nextProps.currentUserId != this.props.currentUserId) {
      const userId = nextProps.currentUserId
    }

  };

  render (){

    let props = this.props

    let n_photos = this.state.photos.length

    if (n_photos == 0) {
      return <div/>
    }
    else {
    return this.state.photos.map(function(photo){
        return (
          <div className="photo-and-delete">
            <img onClick={() => {this.props.addModalPhoto(this.state.photos)}} className="photos-infos" src={photo.url.thumnail.url} key={photo.id}/>
            <Button variant="contained" component="span" onClick={() => {this.props.deletePhoto(photo.id)}}>
              Delete
            </Button>
          </div>
        )
        }.bind(this)
      )
    }

  }
}


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    showPublicPhotos: state.showPublicPhotos,
    loading: state.loader.loading
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
  resetPhotos: () => {
    dispatch(resetPhotos())
  },
  addModalPhoto: (photos, index) => {

    dispatch(addModalPhoto(photos,index))
  }
})



export default connect(mapStateToProps,mapDispatchToProps )(DisplayPrivatePhotos);
