import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import { connect } from "react-redux";
import { hideModalUserInfosDetails } from "../../redux/actions";


class ModalUserInfos extends React.Component {
  render = () => {
    let userInfos = this.props.usersInfosModal
    return (
      <Modal show={this.props.showModalUserInfos} className="modal-user-infos">
        <Modal.Dialog style={{height: 'fit-content'}}>
          <Modal.Header>
            <Modal.Title>{this.props.usersInfosModal.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{userInfos.age? `Age: ${userInfos.age}` : null}</p>
            <p>{userInfos.description? `Description: ${userInfos.description}` : null}</p>
            <p>{userInfos.marital_status? `Marital status: ${userInfos.marital_status}` : null}</p>
            <p>{userInfos.occupation? `Occupation: ${userInfos.occupation}` : null}</p>
            <p>{userInfos.looking_exciting? `Looking exciting: Yes` : null}</p>
            <p>{userInfos.looking_anything? `Looking anything: Yes` : null}</p>
            <p>{userInfos.looking_short? `Looking short: Yes` : null}</p>
            <p>{userInfos.looking_undecided? `Looking undecided: Yes` : null}</p>
            <p>{userInfos.looking_virtual? `Looking virtual: Yes` : null}</p>
            <p>{userInfos.height? `Height: ${userInfos.height}` : null}</p>
            <p>{userInfos.smoker? `Smoker: Yes` : null}</p>
            <p>{userInfos.anything_goes? `Anything goes: Yes` : null}</p>
            <p>{userInfos.being_dominated? `Being dominated: Yes` : null}</p>
            <p>{userInfos.dominating? `Dominating: Yes` : null}</p>
            <p>{userInfos.normal? `Normal: Yes` : null}</p>
            <p>{userInfos.threesome? `Threesome: Yes` : null}</p>
            <p>{userInfos.secret? `Secret: Yes` : null}</p>
            <p>{userInfos.active? `Active: Yes` : null}</p>
            <p>{userInfos.shy? `Shy: Yes` : null}</p>
            <p>{userInfos.sociable? `Sociable: Yes` : null}</p>
            <p>{userInfos.modest? `Modest: Yes` : null}</p>
            <p>{userInfos.fun? `Fun: Yes` : null}</p>
            <p>{userInfos.generous? `Generous: Yes` : null}</p>
            <p>{userInfos.spiritual? `Spiritual: Yes` : null}</p>
            <p>{userInfos.moody? `Moody: Yes` : null}</p>
            <p>{userInfos.relaxed? `Relaxed: Yes` : null}</p>
            <p>{userInfos.sensitive? `Sensitive: Yes` : null}</p>
            <p>{userInfos.aerobics? `Aerobics: Yes` : null}</p>
            <p>{userInfos.martial_arts? `Martial arts: Yes` : null}</p>
            <p>{userInfos.golf? `Golf: Yes` : null}</p>
            <p>{userInfos.soccer? `Soccer: Yes` : null}</p>
            <p>{userInfos.walking? `Walking: Yes` : null}</p>
            <p>{userInfos.rugby? `Rugby: Yes` : null}</p>
            <p>{userInfos.swimming? `Swimming: Yes` : null}</p>
            <p>{userInfos.baseball? `Baseball: Yes` : null}</p>
            <p>{userInfos.cycling? `Cycling: Yes` : null}</p>
            <p>{userInfos.running? `Running: Yes` : null}</p>
            <p>{userInfos.tennis? `Tennis: Yes` : null}</p>
            <p>{userInfos.weight? `Weight: Yes` : null}</p>
            <p>{userInfos.basketball? `Basketball: Yes` : null}</p>
            <p>{userInfos.dance? `Dance: Yes` : null}</p>
            <p>{userInfos.skiing? `Skiing: Yes` : null}</p>
            <p>{userInfos.volleyball? `Volleyball: Yes` : null}</p>
            <p>{userInfos.bowling? `Bowling: Yes` : null}</p>
            <p>{userInfos.Hockey? `Hockey: Yes` : null}</p>
            <p>{userInfos.arts? `Arts: Yes` : null}</p>
            <p>{userInfos.cooking? `Cooking: Yes` : null}</p>
            <p>{userInfos.hiking? `Hiking: Yes` : null}</p>
            <p>{userInfos.networking? `Networking: Yes` : null}</p>
            <p>{userInfos.video_games? `Video games: Yes` : null}</p>
            <p>{userInfos.book? `Book: Yes` : null}</p>
            <p>{userInfos.dining_out? `Dining out: Yes` : null}</p>
            <p>{userInfos.movies? `Movies: Yes` : null}</p>
            <p>{userInfos.nightclubs? `Nightclubs: Yes` : null}</p>
            <p>{userInfos.religion? `Religion: Yes` : null}</p>
            <p>{userInfos.charities? `Charities: Yes` : null}</p>
            <p>{userInfos.museums? `Museums: Yes` : null}</p>
            <p>{userInfos.shopping? `Shopping: Yes` : null}</p>
            <p>{userInfos.wine? `Wine: Yes` : null}</p>
            <p>{userInfos.coffee? `Coffee: Yes` : null}</p>
            <p>{userInfos.gardening? `Gardening: Yes` : null}</p>
            <p>{userInfos.pets? `Pets: Yes` : null}</p>
            <p>{userInfos.music? `Music: Yes` : null}</p>
            <p>{userInfos.being_blinded? `Being blinded: Yes` : null}</p>
            <p>{userInfos.costume? `Costume: Yes` : null}</p>
            <p>{userInfos.role_playing? `Role playing: Yes` : null}</p>
            <p>{userInfos.using_sex_toys? `Using sex toys: Yes` : null}</p>
            <p>{userInfos.unusual_places? `Unusual places: Yes` : null}</p>
            <p>{userInfos.being_watched? `Being watched: Yes` : null}</p>
            <p>{userInfos.willing_experiment? `Willing experiment: Yes` : null}</p>
            <p>{userInfos.cultivated? `Cultivated: Yes` : null}</p>
            <p>{userInfos.imaginative? `Imaginative: Yes` : null}</p>
            <p>{userInfos.independent? `Independent: Yes` : null}</p>
            <p>{userInfos.mature? `Mature: Yes` : null}</p>
            <p>{userInfos.outgoing? `Outgoing: Yes` : null}</p>
            <p>{userInfos.self_confident? `Self confident: Yes` : null}</p>
            <p>{userInfos.reliable? `Reliable: Yes` : null}</p>
            <p>{userInfos.sophisticated? `Sophisticated: Yes` : null}</p>
            {userInfos.photos?
              userInfos.photos.map(photo => {
                return <img src={photo.cropped_url} style={{width: '250px'}}/>
              })
              :null }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => {this.props.hideModalUserInfosDetails()}} variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  modalUserInfos: state.modalUserInfos,
  showModalUserInfos: state.showModalUserInfos,
  usersInfosModal: state.usersInfosModal
});

const mapDispatchToProps = dispatch => ({
  hideModalUserInfosDetails: () => {
    dispatch(hideModalUserInfosDetails())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserInfos);

