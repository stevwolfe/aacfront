import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {Button, ButtonToolbar} from 'react-bootstrap'
import { connect } from "react-redux";
import { addPhoto, fetchCurrentUser } from "../../redux/actions";


class ImgCropper extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 350 / 280
    }
  };

  componentDidMount = () => {
    if (!this.props.currentUserId) {
      this.props.fetchCurrentUser()
    }
  }

  importPhoto = (photo, crop) => {
    console.log(crop, 'crop')
    console.log(crop.croppedImageUrl, 'photo')
    let userId = this.props.currentUserId
    let formPayLoad = new FormData();
    formPayLoad.append('photo', photo);
    formPayLoad.append('user_id', userId);
    formPayLoad.append('x', crop.x);
    formPayLoad.append('y', crop.y);
    formPayLoad.append('width', crop.width);
    formPayLoad.append('height', crop.height);
    this.props.addPhoto(formPayLoad)
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    console.log(ctx, 'ctx')

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      },);
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    console.log(this.state, "croppp")
    return (
      <div className="App">
        <div>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        {src && (
          <div>
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
            {croppedImageUrl && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
            )}
            <ButtonToolbar>
              <Button
                variant="outline-info"
                onClick={() => {this.importPhoto(src, crop)}}
              >
                  Crop
              </Button>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  loader: state.loader.loading
});

const mapDispatchToProps = dispatch => ({
  addPhoto: (photoObj) => {
    dispatch(addPhoto(photoObj));
  },
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ImgCropper);

        // croppedImageUrl && (
        //   <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
        // )
// ReactDOM.render(<App />, document.getElementById("root"));
