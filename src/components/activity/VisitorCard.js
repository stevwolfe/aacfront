import React from 'react';
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../../../src/assets/visitors.css'
import { addModalPhoto } from "../../redux/actions";


export default class VisitorCard extends React.Component   {
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
      <div className="visitor-card">
        <Link style={{display: 'flex', alignItems: 'center'}} to={`/member/${this.props.id}`}>
          <img src={this.props.urlPhoto} style={{marginRight: '25px'}} />
          <h5 style={{fontWeight: "bold"}}> {this.props.username}</h5>
          <h5> {`Visited your profile on ${this.props.date} at ${this.props.hours}`}</h5>
        </Link>
      </div>
    )
}

