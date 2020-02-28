import React from "react";
import ImportPhotos from "./ImportPhotos";
import ImportPhotoPrivate from "./ImportPhotoPrivate";
import PublicPhoto from './PublicPhoto';
import PrivatePhotos from './PrivatePhotos'
import { connect } from "react-redux";
import { _} from 'underscore';
import { getPhotos } from "../../redux/actions";
import MainNavbar from '../home/MainNavbar';
import ModalPhotos from './ModalPhotos';
import EasyCrop from './EasyCrop';
import PhotoShow from './PhotoShow';
import ButtonsPhotos from './ButtonsPhotos'

class Photos extends React.Component {
  state = {
            modalPhotos: [],
            showCrop: false,
            path: ''
          }

  componentDidMount = () => {
    if (this.props.showPublicPhotos.length) {
      let profilePic = this.props.showPublicPhotos.filter(photo => photo.primary)
      if (profilePic.length){
        const profilePicId = profilePic[0].id
        
      }
    }
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.showCropper != this.props.showCropper) {
      this.setState({showCrop: prevProps.showCropper,
                     path: prevProps.photoCropper
                    })
    }
  }

  render() {
  // console.log(this.props.showPublicPhotos.length)
    const allPhotos = this.props.showPublicPhotos.length
    let photos_private = 0
    this.props.showPublicPhotos.map(photo => {
      if (photo.private) {
        photos_private ++
      }
    })
    let n_photos = 6 - (this.props.showPublicPhotos.length - photos_private)

    return (
      <div>
        <MainNavbar />
        <div id="conversations_list_container" className='container-photos col-sm-10 col-sm-offset-1'>
        <h3 className="text-center"> Photos book </h3>
          <div className="row flex-infos-button">
            <div className="col-sm-4">
               <PhotoShow />
               <ButtonsPhotos />
            </div>
            <div className="col-sm-8 photos-col" style={{alignItems: 'center', justifyContent: 'space-around'}}>
              <PublicPhoto/>
                {_.times(n_photos, () => {

                   return <ImportPhotos />
                 }
                  )
                }
            </div>
          </div>
        </div>
        {this.state.showCrop? <EasyCrop photo={this.state.path} /> : null}
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    showPublicPhotos: state.showPublicPhotos,
    loading: state.loader.loading,
    showPrivatePhotos: state.showPrivatePhotos,
    showCropper: state.showCropper,
    photoCropper: state.photoCropper
  }
};




export default connect(mapStateToProps, )(Photos)
