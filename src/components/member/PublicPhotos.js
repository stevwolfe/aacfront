import React from 'react';
import MainNavbar from '../home/MainNavbar'
import {Row, Col} from 'react-bootstrap'
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TopPart from './TopPart';
import '../../../src/assets/membershow.css'
import { addModalPhoto } from "../../redux/actions";


class PublicPhotos extends React.Component   {
  state = {
    photos: [],

  };

  componentDidMount = () => {
    if (this.props.showMemberPhotos.length) {
      let photos = this.props.showMemberPhotos
      let publicPhotos = []
      let bigPhotos = []
      photos.filter(photo => {
        if (!photo.private) {
          publicPhotos.push(photo)
        }
      })

      this.setState({photos : publicPhotos})
    }
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.showMemberPhotos != this.props.showMemberPhotos) {
      let photos = prevProps.showMemberPhotos
      let publicPhotos = []
      let bigPhotos = []
      photos.filter(photo => {
        if (!photo.private) {
          publicPhotos.push(photo)
        }
      })

      this.setState({photos : publicPhotos})
    }
  }

  render = () =>
    (
      <div className="basic-infos">
        <div class='title'> Photo book </div>
        <div class="photos">
          {this.state.photos.length?
            this.state.photos.map(photo => {
              return <img
                className={this.props.currentUser.member? null : "blurred"}
                onClick={() => {this.props.currentUser.member?
                  this.props.addModalPhoto(this.state.photos):
                  this.props.history.push("/subscription")
                }}
                src={photo.cropped_url?photo.cropped_url:photo.remote_url}/>
            }):null
          }
        </div>
      </div>
    )
}


const mapStateToProps = state => {
  return {
    showMemberPhotos: state.showMemberPhotos,
    currentUser: state.currentUser
  }
};


const mapDispatchToProps = dispatch => ({
  addModalPhoto: (photos, index) => {
    dispatch(addModalPhoto(photos, index));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicPhotos);

