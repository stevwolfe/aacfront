import React from 'react'
import ReactDOM from 'react-dom'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
import './styles.css'
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { addCroppingValues } from "../../redux/actions";


class EasyCropper extends React.Component {
  state = {
    imageSrc: "",
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 280 / 270,
    x: '',
    y: '',
    width: '',
    height: ''
  }

  componentDidMount = () => {

    this.setState({imageSrc: this.props.photoCropper})

  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    const x = croppedAreaPixels.x
    const y = croppedAreaPixels.y
    const width = croppedAreaPixels.width
    const height = croppedAreaPixels.height
    this.setState({
      x,y,width,height
    })
  }

  onCropBtn = () => {
    this.props.addCroppingValues(
      this.state.x,
      this.state.y,
      this.state.width,
      this.state.height,
      this.state.imageSrc,
      this.props.currentUserId
      )

  }


  onZoomChange = zoom => {
    this.setState({ zoom })
  }

  render() {
    return (
      <div className="App">
        <div className="crop-container">
          <Cropper
            image={this.state.imageSrc}
            crop={this.state.crop}
            zoom={this.state.zoom}
            aspect={this.state.aspect}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
        </div>
        <div className="controls">
          <Slider
            value={this.state.zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => this.onZoomChange(zoom)}
            classes={{ container: 'slider' }}
          />
          <Button onClick={() => {this.onCropBtn()}} variant="outline-primary">Crop</Button>
        </div>

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    photoCropper: state.photoCropper,
    currentUserId: state.currentUser.id
  }
};

const mapDispatchToProps = dispatch => ({
  addCroppingValues: (x,y,width,height, url, userId) => {
    dispatch(addCroppingValues(x,y,width,height, url, userId));
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(EasyCropper);


