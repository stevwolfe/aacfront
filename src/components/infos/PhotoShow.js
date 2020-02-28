import React from 'react';
import { connect } from "react-redux";
import { makePrimary } from "../../redux/actions";

class PhotoShow extends React.Component   {
  state = {
    photoUrl: "",
    photoId: ''
  };

  componentWillMount = () => {
    if (this.props.photos.length) {
      let profilePic = this.props.photos.filter(photo => photo.primary) 
      this.setState({photoUrl: profilePic})
    }
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.photos != this.props.photos) {
      let profilePic = prevProps.photos.filter(photo => photo.primary)
      if (profilePic.length) {
        this.setState({photoUrl: profilePic[0].cropped_url})      
      }    
    }
    if (prevProps.selectedPhoto.url != this.props.selectedPhoto.url) {
      console.log(prevProps, "prevProps update")
      this.setState({photoUrl: prevProps.selectedPhoto.url,
                     photoId: prevProps.selectedPhoto.id
                    })
    }
  }

  render = () =>
    (
      <div>
        {this.state.photoUrl?
          <img src={this.state.photoUrl} style={{width: '100%'}} />
          :<img src={require('../../assets/blank-picture.png')} style={{width: '100%'}}/>
        }
      </div>
    )
}



const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  selectedPhoto: state.selectedPhoto,
  photos: state.showPublicPhotos
});

// const mapDispatchToProps = dispatch => ({
//   makePrimary: (userId, photoId) => {
//     dispatch(makePrimary(userId, photoId))
//   }
// })

export default connect(mapStateToProps, null)(PhotoShow);
