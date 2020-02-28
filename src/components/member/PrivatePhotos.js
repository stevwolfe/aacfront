import React from 'react';
import MainNavbar from '../home/MainNavbar'
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TopPart from './TopPart';
import '../../../src/assets/membershow.css'
import { addModalPhoto } from "../../redux/actions";
import HiddenPrivatePhoto from './components/HiddenPrivatePhoto'
import _ from 'lodash';

class PrivatePhotos extends React.Component   {
  state = {
    photos: [],
    access: true
  };

  componentWillUpdate = (prevProps) => {
    if (prevProps.showMemberPhotos != this.props.showMemberPhotos) {
      let photos = prevProps.showMemberPhotos
      let publicPhotos = []
      let bigPhotos = []
      photos.filter(photo => {
        if (photo.private) {
          publicPhotos.push(photo)
        }
      })

      this.setState({photos : publicPhotos}, () => {
        let nPhotos = this.state.photos.length
        console.log(nPhotos, "photos pvt")
      })

    }


  }

  render = () =>
    (
      <div className="basic-infos">
        <div class='title'> Private photos </div>
        <div class="photos">
          { this.state.photos.length && !this.state.access ? _.range(0, this.state.photos.length).map(value => {
            return <HiddenPrivatePhoto/>
          }): null
          }
          { this.state.photos.length && this.state.access ? this.state.photos.map(photo => {
              return <img onClick={() => {this.props.addModalPhoto(this.state.photos)}} src={photo.url.thumnail.url}/>
          }): null
          }
          { !this.state.photos.length ?
              <h4> No private photos to display </h4>
              : null
          }
        </div>
      </div>
    )
}


const mapStateToProps = state => {
  return {
    showMemberPhotos: state.showMemberPhotos
  }
};


const mapDispatchToProps = dispatch => ({
  addModalPhoto: (photos, index) => {
    dispatch(addModalPhoto(photos, index));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePhotos);
