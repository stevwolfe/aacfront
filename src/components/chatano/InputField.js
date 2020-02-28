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
  Glyphicon,

} from "react-bootstrap";
import { addMessage, showSmileys, chatInputPvt, addEmojiPvt, resetChatPvt } from "../../redux/actions";
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
  resetChatPvt
}) => {
  let input;
  let newMessageCable;
  let newConversationCable;


  const onSubmit = e => {
    e.preventDefault();
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
      newMessageCable.perform("send_message", {
      message: inputValue,
      conversation: activeConversationId,
      user: currentUserId
    });
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
          <Col md={11} style={{ paddingRight: 0}}>
            <FormGroup style={{position: 'relative' }} bsSize="large" >
              <FormControl
                id="inputPvt"
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
  let newConversation;
  if (conversation && conversation.messages) {
    newConversation = activeConversationId
      ? conversation.messages.length === 0
      : null;
  }
  let currentFakeUser;
  if (state.activeConvoObject.users && state.fakesList.length) {
    state.activeConvoObject.users.filter(user => {
      state.fakesList.map(fake => {
        if (fake.id == user.id ) {
          currentFakeUser = fake.id
        }
      })
    })
  }
  return {
    currentUserId: state.activeConvoObject.users? currentFakeUser:"",
    activeConversationId,
    newConversation,
    conversation,
    showSmileys,
    inputChatPvt
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
