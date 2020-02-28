import React from 'react';
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../../../src/assets/visitors.css'


export default class SmileyCard extends React.Component   {
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
        <Link to={`/member/${this.props.id}`} style={{display: 'flex', alignItems: 'center'}}>
          <img src={this.props.urlPhoto} style={{marginRight: '20px'}}/>
          <h5> {`You added ${this.props.username} to your favorites list on ${this.props.date} at ${this.props.hours}`}</h5>
        </Link>
      </div>
    )
}

