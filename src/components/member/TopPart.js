import React from 'react';
import MainNavbar from '../home/MainNavbar'
import {Row, Col} from 'react-bootstrap'
import { cancelNewConversation,
         sendSmiley,
         addFavorite,
         conversationFromMemberShow,
         removeFavorite,
         changeActiveConversation,
         resetConversationId,
         blockMember,
         showModalNoMessageaRemaining
       } from "../../redux/actions";
import { connect } from "react-redux";
import '../../../src/assets/membershow.css'
import {getAge} from '../../functions.js'
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import ModalSendMessage from './ModalSendMessage'
import {
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import ModalNoRemainingMessages from '../chat/ModalNoRemainingMessages'

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "2em",
        color: "yellow",
        backgroundColor: "red"
      }
    }
  }
});


class TopPart extends React.Component   {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mainPhoto: '',
      age: "",
      feet: "",
      inches: '',
      eyeColor: "",
      hairColor: "",
      smoker: null,
      sentSmileysList: [],
      favoritesList: [],
      modalOpen: false,
      city: ''
    };
  }

  handleSendMessage = () => {
    console.log("hi")
    fetch(this.props.conversationFromMemberShow(this.props.currentUserId,this.props.id))
    // .then(this.setState({modalOpen: true}))
    // .then(this.props.history.push("/chat"))
  }

  modalClose = () => {
    this.setState({ modalOpen: false })
    let convoId = this.props.conversationId
    const textModal = document.getElementById('text-modal')
    if (!textModal) {
      this.props.cancelNewConversation(convoId, this.props.currentUserId)
    }
  }

  componentWillUnmount = (prevProps) => {
    this.props.resetConversationId()
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.showMemberPage != this.props.showMemberPage) {
      this.setState({name: prevProps.showMemberPage.username,
                     age: prevProps.showMemberPage.age,
                     feet: prevProps.showMemberPage.feet,
                     inches: prevProps.showMemberPage.inches,
                     eyeColor: prevProps.showMemberPage.eyeColor,
                     hairColor: prevProps.showMemberPage.hairColor,
                     smoker: prevProps.showMemberPage.smoker,
                     mainPhoto: prevProps.showMemberPage.photoProfil,
                     city: prevProps.showMemberPage.city
                   })
    }
    // if (prevProps.showMemberPhotos != this.props.showMemberPhotos && prevProps.showMemberPhotos.length) {
    //   let photos = prevProps.showMemberPhotos
    //   photos.filter((photo) => {
    //     return photo.primary })
    //   this.setState({mainPhoto: prevPphotoProfil})
    // }

    if (prevProps.smileysSentList != this.props.smileysSentList) {
      let sentSmileysList = []
      prevProps.smileysSentList.filter(obj => {
        if (obj.receiver === this.props.id) {
          sentSmileysList.push(obj)
        }

      })
      this.setState({sentSmileysList})
    }

    if (prevProps.favoritesList != this.props.favoritesList) {
      let favoritesList = []

      prevProps.favoritesList.filter(obj => {
        if (obj.user_id === this.props.id) {
          favoritesList.push(obj)
        }
      })
      this.setState({favoritesList})
    }
    if (prevProps.conversationId != this.props.conversationId) {
      this.props.conversations.map(convo => {
        if (convo.id == prevProps.conversationId) {
          this.props.history.push("/chat")
        } else {
          this.setState({modalOpen: true})
        }
      })
      if  (!this.props.conversations.length) {
            this.setState({modalOpen: true})
      }

    }
  }

  render = () =>
    (
      <div>

        <ModalNoRemainingMessages />
        <ModalSendMessage
          show={this.state.modalOpen}
          onHide={this.modalClose}
          name= {this.state.name}
          photo={this.state.mainPhoto}
          // userId={this.props}
        />
        <Row className="member-show">
          <div className="col-md-4 photo-member" style={{padding: '0'}}>
            <img
              className="image"
              src={this.state.mainPhoto?this.state.mainPhoto:require('../../assets/blank-picture.png')}/> </div>
          <div className="details col-md-8">
            <h1> {this.state.name} </h1>
            <h3> {this.state.city} </h3>
            <ul className="infos">
              <li>
                <h5>Age</h5>
                <span>{this.state.age}</span>
              </li>
            {this.state.feet?
              <li>
                <h5>Height</h5>
                <span>{`${this.state.feet}ft ${this.state.inches}in`}</span>
              </li> : null}
            {this.state.eyeColor?
              <li>
                <h5>Eye color</h5>
                <span>{this.state.eyeColor}</span>
              </li> : null}
            {this.state.hairColor?
             <li>
                <h5>Hair color</h5>
                <span>{this.state.hairColor}</span>
              </li>: null
            }
            {this.state.smoker ?
             <li>
                <h5>Smoker</h5>
                <span>Yes</span>
              </li> : <li>
                <h5>Smoker</h5>
                <span>No</span>
              </li>
            }
            </ul>
            <div className="picture-member-sm">
            <img
              // className={this.props.currentUser.member?"":"blurred"}
              src={this.state.mainPhoto?this.state.mainPhoto:require('../../assets/blank-picture.png')}/>
            </div>
          </div>
          <section className="topbar-action  col-md-8">
            <ul className="actions">
              <li onClick={
                ((!this.props.member) && !(this.props.remainingMessages > 0))? this.props.showModalNoMessageaRemaining: this.handleSendMessage
              }>
                <img style={{height: '35px'}} src={require("../../assets/email.png")}/>
                <span style={{marginLeft: '15px'}}> Message </span>
              </li>
              {this.state.sentSmileysList.length?
                <li>
                  <img  src={require("../../assets/happy.png")}/>
                </li> :
                <li onClick={() => {this.props.sendSmiley(this.props.id,this.props.currentUserId)}}>
                  <img  src={require("../../assets/happiness.png")}/>
                </li>
              }
              {this.state.favoritesList.length?
                <li>
                  <img onClick={() => {this.props.removeFavorite(this.props.id,this.props.currentUserId)}} src={require("../../assets/gold_star.png")}/>
                </li> :
                <li onClick={() => {this.props.addFavorite(this.props.id,this.props.currentUserId)}}>
                  <img  src={require("../../assets/star.png")}/>
                </li>
              }
            </ul>
            <MuiThemeProvider theme={theme}>
              <Tooltip title="BLOCK USER" placement="top">
                <div className="btn-actions" onClick={() => {this.props.blockMember(this.props.currentUserId, this.props.id)}}>
                  <img src={require("../../assets/block.png")}/>
                </div>
              </Tooltip>
            </MuiThemeProvider>
          </section>
        </Row>
      </div>
    )
}



const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    showMemberPage: state.showMemberPage,
    showMemberPhotos: state.showMemberPhotos,
    smileysSentList: state.smileysSentList,
    favoritesList: state.favoritesList,
    conversationModal: state.conversationModalFromShow,
    conversationId: state.convoSelectedFromShow,
    conversations: state.conversations,
    currentUser: state.currentUser,
    member: state.member,
    remainingMessages: state.currentUser.remainingMessages
  }
};

const mapDispatchToProps = dispatch => ({
  sendSmiley: (memberId, userId) => {
    dispatch(sendSmiley(memberId, userId))
  },
  addFavorite: (memberId, userId) => {
    dispatch(addFavorite(memberId, userId))
  },
  removeFavorite: (memberId, userId) => {
    dispatch(removeFavorite(memberId, userId))
  },
  conversationFromMemberShow:(userId, memberId) => {
    dispatch(conversationFromMemberShow(userId, memberId))
  },
  changeActiveConversation: (conversationId) => {
    dispatch(changeActiveConversation(conversationId))
  },
  resetConversationId: () => {
    dispatch(resetConversationId())
  },
  cancelNewConversation: (conversationId, userId) => {
    dispatch(cancelNewConversation(conversationId, userId));
  },
  blockMember: (userId, memberId) => {
    dispatch(blockMember(userId, memberId))
  },
  showModalNoMessageaRemaining: () => {
    dispatch(showModalNoMessageaRemaining())    
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopPart);




