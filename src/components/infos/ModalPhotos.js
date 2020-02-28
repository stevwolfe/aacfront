import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { connect } from "react-redux";



class ModalPhotos extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { modalIsOpen: false,
            photos: [],
            indexPhoto: "2"
           }


  componentWillReceiveProps(nextProps) {
    // debugger
    // if (this.state.photos != nextProps.modalPhotos.urlsList) {
    //   console.log(nextProps.modalPhotos.urlsList, "nextProps")
    // }
    let modalOpen = nextProps.openPhotosModal
    const photos = nextProps.modalPhotos.urlsList
    const index = this.props.modalIndex
    this.setState({ modalIsOpen: photos,
                   photos,
                   indexPhoto: index
                  })
  }

  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  }
  render() {
    const { modalIsOpen } = this.state;

    return (
      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={this.toggleModal}>
            <Carousel views={this.state.photos} currentIndex={this.state.indexPhoto} />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}


const mapStateToProps = state => ({
  modalPhotos: state.modalPhotos["0"],
  openPhotosModal: state.openPhotosModal,
  modalIndex: state.modalIndex.index
});

// const mapDispatchToProps = dispatch => ({
//   addPhoto: (user_id, photo) => {
//     dispatch(addPhoto(user_id, photo));
//   },
//   // fetchCurrentUser: () => {
//   //   dispatch(fetchCurrentUser())
//   // },
// })

export default connect(mapStateToProps)(ModalPhotos);
