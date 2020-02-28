import React from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
  Glyphicon
} from "react-bootstrap";
import { showModalNoMessageaRemaining, addMessage, showSmileys, chatInputPvt, addEmojiPvt, resetChatPvt, updateCounter } from "../../redux/actions";
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

let InputField = ({
  currentUserId,
  activeConversationId,
  conversation,
  newConversation,
  addMessage,
  showSmileys,
  showSmileysList,
  chatInput,
  inputChatPvt,
  addEmojiPvt,
  resetChatPvt,
  member,
  remainingMessages,
  updateCounter,
  showModalNoMessageaRemaining
}) => {
  let input;
  let newMessageCable;
  let newConversationCable;

  const submitEmoji = e => {
    const inputValue = e.native
    newMessageCable.perform("send_message", {
      message: inputValue,
      conversation: activeConversationId,
      user: currentUserId})
    findDOMNode(input).value = ""
  }


  const onSubmit = e => {
    e.preventDefault();
    // const inputValue = findDOMNode(input).value;
    const inputValue = inputChatPvt;
    if (!inputValue.trim()) {
      return;
    }
    if (newConversation) {
      newConversationCable.perform("new_conversation", {
        conversation,
        message: {
          text: inputValue,
          conversation: activeConversationId,
          user: currentUserId
        }
      });
    } else {
      if ((!member) && !(remainingMessages > 0)) {
        showModalNoMessageaRemaining()
      } else {
        updateCounter()
        newMessageCable.perform("send_message", {
        message: inputValue,
        conversation: activeConversationId,
        user: currentUserId
        });
      }
    }
    // addMessage(inputValue, activeConversationId, currentUserId);
    // findDOMNode(input).value = "";
    resetChatPvt()
  };

  return (
    <Grid style={styles.grid}>
      <ActionCable
        ref={node => {
          newMessageCable = node;
        }}
        channel={{
          channel: "ConversationChannel",
          conversation: activeConversationId
        }}
      />
      <ActionCable
        ref={node => {
          newConversationCable = node;
        }}
        channel={{ channel: "NewConversationChannel", user: currentUserId }}
      />
      <Row>
        <form autoComplete="off" onSubmit={e => onSubmit(e)}>
          <Col md={11} style={{ paddingRight: 0 }}>
            <FormGroup bsSize="large" style={{position: 'relative' }}>
              <FormControl
                type="text"
                placeholder="Type to chat..."
                ref={node => {
                  input = node;
                }}
                value={inputChatPvt}
                onChange={e => chatInput(e.target.value)}
              />
              <img
                id="imgSmiley"
                style={{position: 'absolute', bottom: '10px', right: '15px', cursor: 'pointer'}}
                src={require('../../assets/happy.png')}
                onClick={() => showSmileysList()}
              />
              {showSmileys?
                <Picker
                  onSelect={(emoji, event) => {
                    showSmileysList()
                    addEmojiPvt(emoji.native)
                    let getCoordinates = document.getElementById('imgSmiley').getBoundingClientRect()

                    }
                  }
                  set={'apple'}
                  style={{width: '338px', position: 'absolute', bottom: '45px', right: '0'}} />  :null}
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button
              bsStyle="primary"
              bsSize="large"
              style={styles.submitButton}
              type="submit"
              className="send_message_button"
            >
              <Glyphicon glyph="send" style={{ marginLeft: "-4px" }} />
            </Button>
          </Col>
        </form>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => {
  const activeConversationId = state.activeConversationId;
  const showSmileys = state.showSmileys
  const inputChatPvt = state.inputChatPvt
  const conversation = state.conversations.find(
    c => c.id === state.activeConversationId
  );
  const newConversation = activeConversationId && conversation
    ? conversation.messages.length === 0
    : null;
  return {
    currentUserId: state.currentUser.id,
    activeConversationId,
    newConversation,
    conversation,
    showSmileys,
    inputChatPvt,
    member: state.currentUser.member,
    remainingMessages: state.currentUser.remainingMessages
  };
};

const mapDispatchToProps = dispatch => ({
  addMessage: (text, conversationId, userId) => {
    dispatch(addMessage(text, conversationId, userId));
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
  },
  showModalNoMessageaRemaining: () => {
    dispatch(showModalNoMessageaRemaining())    
  }
});

InputField = connect(mapStateToProps, mapDispatchToProps)(InputField);

const styles = {
  grid: {
    marginTop: "20px"
  },
  submitButton: {
    width: "100%",
    paddingTop: "12px",
    paddingBottom: "8px"
  }
};

export default InputField;
