import React from 'react';
import {Modal, Button, ButtonToolbar} from 'react-bootstrap'
import '../../../src/assets/membershow.css'
import TextFieldModal from './components/TextFieldModal'
import {updateCounter, addMessageFromModal, cancelNewConversation, showSmileys, chatInputPvt, addEmojiPvt, resetChatPvt} from "../../redux/actions";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Input from '../chat/InputField';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'


const styles = {
//style for font size
resize:{
  fontSize:100
},
}

class ModalSendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  handleChange = (event) => {
    this.props.chatInput(event.target.value)
  }

  handleCancel = () => {
    this.props.onHide()
    let convoId = this.props.conversationId
    this.props.cancelNewConversation(convoId, this.props.currentUserId)
  }
  handleSendMessage = () => {
    this.props.addMessage(this.props.inputChatPvt, this.props.conversationId, this.props.currentUserId )
    // let sendMessage;
    // sendMessage.perform("send_message", {
    //   message: this.state.text,
    //   conversation: this.props.conversationId,
    //   user: this.props.currentUserId})
    this.props.onHide()
    this.props.resetChatPvt()
    this.props.updateCounter()
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <div class="modale-header-member">
              <img src={this.props.photo} />
              <h3>{`What would you like to say to ${this.props.name}?`}</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{position: 'relative'}}>
            <TextField
              id="text-modal"
              style={{ margin: 8, width: '85%' }}
              placeholder="It's your first message! Try to be creative :)"
              fullWidth
              multiline
              value={this.props.inputChatPvt}
              margin="normal"
              onChange={this.handleChange}
              InputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          <img
            id="imgSmiley"
            style={{position: 'absolute', bottom: '10px', right: '15px', cursor: 'pointer'}}
            src={require('../../assets/happy.png')}
            onClick={() => this.props.showSmileysList()}
          />
          {this.props.showSmileys?
            <Picker

              onSelect={(emoji, event) => {
                this.props.showSmileysList()
                this.props.addEmojiPvt(emoji.native)
                let getCoordinates = document.getElementById('imgSmiley').getBoundingClientRect()

                }
              }
              set={'apple'}
              style={{width: '338px', position: 'absolute', right: '0'}} />  :null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCancel}>Close</Button>
          <Button className="btn-primary"
            onClick={this.handleSendMessage}>Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    showMemberPage: state.showMemberPage,
    conversationId: state.convoSelectedFromShow,
    showSmileys: state.showSmileys,
    inputChatPvt: state.inputChatPvt
  }
};

const mapDispatchToProps = dispatch => ({
  addMessage: (text, conversationId, userId) => {
    dispatch(addMessageFromModal(text, conversationId, userId));
  },
  cancelNewConversation: (conversationId, userId) => {
    dispatch(cancelNewConversation(conversationId, userId));
  },
  showSmileysList: () => {
    dispatch(showSmileys())
  },
  chatInput: (e) => {
    dispatch(chatInputPvt(e))
  },
  addEmojiPvt: (e) => {
    dispatch(addEmojiPvt(e))
  },
  resetChatPvt: () => {
    dispatch(resetChatPvt())
  },
  updateCounter: () => {
    dispatch(updateCounter())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSendMessage);
