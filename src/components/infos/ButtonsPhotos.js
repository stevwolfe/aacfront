import React from 'react';
import { connect } from "react-redux";
import { makePrimary, deletePhotos, selectedPhoto } from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


class ButtonsPhotos extends React.Component   {
  state = {
    primary: false,
    newPage: false,
  
  };

  componentDidMount = () => {
    if (this.props.showPublicPhotos.length) {
      let primaryPhoto = this.props.showPublicPhotos.filter(photo => photo.primary)
      if (this.props.selectedPhoto != primaryPhoto[0]) {
        this.props.makeSelected(primaryPhoto[0])
      }

    }
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.showPublicPhotos.length != this.props.showPublicPhotos.length && !this.props.showPublicPhotos.length) {
      let primaryPhoto = prevProps.showPublicPhotos.filter(photo => photo.primary)
      if (prevProps.selectedPhoto != primaryPhoto[0]) {
        this.props.makeSelected(primaryPhoto[0])
      }

    }
    if (prevProps.selectedPhoto.primary != this.props.selectedPhoto.primary) {
      console.log(prevProps.selectedPhoto.primary, 'changed in props')
      this.setState({active: prevProps.selectedPhoto.primary, primarySelected: false})
    }
  }

  render = () =>

    (
      <div className="photo-btns" style={this.props.selectedPhoto.primary?{justifyContent: 'flex-end'}: null}>
        {this.props.selectedPhoto.primary? null:
          this.props.selectedPhoto?
            <Button variant="contained" color="primary"
            className={useStyles.button}
            onClick={() => {this.props.makePrimary(this.props.currentUserId, this.props.selectedPhoto.id)}}
            >
             Make profile picture
            </Button>:null
        }
        {
          this.props.selectedPhoto?<Button
            color="secondary"
            className={useStyles.button}
            onClick={() => {this.props.deletePhotos(this.props.selectedPhoto.id)}}
          >
           Delete
          </Button>:null
        }
      </div>
    )
}



const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  selectedPhoto: state.selectedPhoto, 
  showPublicPhotos: state.showPublicPhotos,
  selectedPhoto: state.selectedPhoto
})

const mapDispatchToProps = dispatch => ({
  makePrimary: (userId, photoId) => {
    dispatch(makePrimary(userId, photoId))
  },
  deletePhotos: (photoId) => {
    dispatch(deletePhotos(photoId))
  },
  makeSelected: (photoObject) => {
    dispatch(selectedPhoto(photoObject))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsPhotos);
