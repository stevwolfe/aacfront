import React, {Fragment} from 'react';
import { getPhotos, fetchCurrentUser, resetPhotos, selectedPhoto, makePrimary } from "../../redux/actions";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import ImportPhotos from './ImportPhotos'


class DisplayPublicPhotos extends React.Component {

  state= {
    photos: [],
    loading: false,
    currentUser: "",

  }

  componentWillUnmount() {
    this.props.resetPhotos()
  }

  componentDidMount() {
    const userId = this.props.currentUserId
    const photos = this.state.photos
    if (userId &&  photos.length == 0 ) {
      this.props.getPhotos(userId)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    let publicPhotos = []
    if (nextProps.showPublicPhotos) {
      nextProps.showPublicPhotos.map(photo => {
        if (!photo.private) {
          publicPhotos.push(photo)
        }
      })
    }


    this.setState( { photos: publicPhotos,
                     loading: nextProps.loading,
                     currentUser: nextProps.currentUserId
                   })

    if (nextProps.currentUserId != this.props.currentUserId) {
      const userId = nextProps.currentUserId
      this.props.getPhotos(userId)
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
       let  i = 0
        return (
          <div className="photo-and-delete">
            <img
              onClick={() => {
                this.props.selectedPhoto(photo.cropped_url?
                  {cropped_url: photo.cropped_url,
                    id: photo.id,
                    primary:photo.primary}:
                  {cropped_url:photo.url.thumnail.url,
                    id: photo.id,
                   primary: photo.primary
                  }
                  )
                }
              }
              className="photos-infos"
              src={photo.cropped_url? photo.cropped_url:photo.url.url}
              key={photo.id}/>
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
  getPhotos: userId => {
    dispatch(getPhotos(userId));
  },
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
  resetPhotos: () => {
    dispatch(resetPhotos())
  },
  makePrimary: (userId, photoId) => {
    dispatch(makePrimary(userId, photoId))
  },
  selectedPhoto: (photoObject) => {
    dispatch(selectedPhoto(photoObject))
  }
})



export default connect(mapStateToProps,mapDispatchToProps )(DisplayPublicPhotos);
