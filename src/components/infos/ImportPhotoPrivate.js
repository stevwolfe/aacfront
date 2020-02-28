import React, {useEffect, useState, Component} from 'react';
import Dropzone  from 'react-dropzone';
import { API_ROOT, addPhotoPrivate, fetchCurrentUser } from "../../redux/actions";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";

const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: token
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};



class ImportPhotoPrivate extends Component {
  constructor(props) {
    super(props);
    this.onDrop = (files) => {

      const user_id = this.state.currentUserId
      if (files && files[0]) {
        let formPayLoad = new FormData();
        formPayLoad.append('photo', files[0]);
        formPayLoad.append('user_id', user_id);
        props.addPhotoPrivate(formPayLoad)

      }

    };
    this.state = {
      files: [],
      loading: false,
      currentUserId: ""
    };
  }

  componentDidMount() {
    if (!this.state.currentUserId) {
      this.setState({currentUserId: this.props.currentUserId})
    }

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.currentUserId != this.state.currentUserId) {
      this.setState({currentUserId: nextProps.currentUserId})
    }

    if(nextProps.loader != this.props.loader) {
      this.setState({loading: nextProps.loader})
    }
  }



  render() {

    if (!this.state.loading) {
      return (
        <Dropzone
          onDrop={this.onDrop}
        >
          {({getRootProps, getInputProps}) => (
            <section >
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps({accept: 'image/jpeg, image/png'})} />
                <img src="https://img.icons8.com/cotton/64/000000/plus.png"/>
                <p> Click or drag </p>
              </div>
            </section>
          )}
        </Dropzone>
      );
    } else {
      return <BeatLoader/>
    }
  }
}

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  loader: state.loader.loading
});

const mapDispatchToProps = dispatch => ({
  addPhotoPrivate: (user_id, photo) => {
    dispatch(addPhotoPrivate(user_id, photo));
  },
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportPhotoPrivate);
