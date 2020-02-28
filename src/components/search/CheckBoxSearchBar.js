import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from "react-redux";
import { filterOnline, unfilterOnline, filterPhotos, unfilterPhotos,} from "../../redux/actions";


class Checkboxes extends React.Component {
  state = {
    online: false,
    photos: false
  }

  handleChangeOnline() {
    if(!this.state.online) {
      this.props.filterOnline()
      this.setState({online: true})
    } 
    if(this.state.online) {
      this.props.unfilterOnline()
      this.setState({online: false})
    } 
  }

  handleChangePhotos() {
    if(!this.state.photos) {
      this.props.filterPhotos()
      this.setState({photos: true})
    } 
    if(this.state.photos) {
      this.props.unfilterPhotos()
      this.setState({photos: false})
    } 
  }

  componentDidMount() {
    if (this.props.lookingOnline) {
      this.setState({online: true})
      this.props.filterOnline()
    }
    if (this.props.lookingPhotos) {
      this.setState({photos: true})
      this.props.filterPhotos()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lookingOnline != this.props.lookingOnline) {
      if (!prevProps.lookingOnline) {
        this.setState({online: true})
        this.props.filterOnline()
      } else {
        this.setState({online: false})
        this.props.unfilterOnline()        
      }
    }

    if (prevProps.lookingPhotos != this.props.lookingPhotos) {
      if (!prevProps.lookingPhotos) {
        this.setState({photos: true})
        this.props.filterPhotos()
      } else {
        this.setState({photos: false})
        this.props.unfilterPhotos()        
      }
    }

  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.online}
              onChange={() => this.handleChangeOnline()}
              value="online"
              color="primary"
            />
          }
          label="Online"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.photos}
              onChange={() => this.handleChangePhotos()}
              value="photos"
              color="primary"
            />
          }
          label="With photos"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lookingOnline: state.currentUser.lookingOnlineMember,
  lookingPhotos: state.currentUser.lookingPhotosMember,
});


const mapDispatchToProps = dispatch => ({
  filterOnline: () => {
    dispatch(filterOnline())
  },
  unfilterOnline: () => {
    dispatch(unfilterOnline())
  },
  filterPhotos: () => {
    dispatch(filterPhotos())
  },
  unfilterPhotos: () => {
    dispatch(unfilterPhotos())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkboxes);
