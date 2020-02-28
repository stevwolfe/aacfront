import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import { Button, Glyphicon, Grid, Col, Row, DropdownButton, Dropdown} from "react-bootstrap";
import {
  changeActiveConversation,
  showEditConversationModal,
  receiveAddedMessage,
  editConversationTitle,
  receiveLeftConversation,
  leaveConversation,
  updateViewConversation
} from "../../redux/actions";
import NotificationDot from "./NotificationDot";
import ToggleChatOptions from './ToggleChatOptions';
import OnlineDot from './OnlineDot';

const ConversationCard = ({
  conversation,
  activeConversationId,
  currentUserId,
  changeActive,
  showEditConversationModal,
  receiveNewMessage,
  editTitle,
  lConversation,
  receiveLConversation,
  viewConversation,
  currentUser,
  conversations
}) => {
  const { id, title, latest_message, last_viewed, users } = conversation;
  let myPhotos = users?users.filter(user => user.id !== currentUserId):[{photo: ""}];
  let onlineMember = myPhotos[0].online
  let displayTitle;
  if (title) {
    displayTitle = title;
  } else {
    try {
      const myUsers = users.filter(user => user.id !== currentUserId);
      const userNames = myUsers.map(user => user.username);
      displayTitle = userNames.join(", ");
    } catch (err) {
      debugger;
    }
  }
  let activeConvoMemberId;
  let activeConvoMemberName;
  if (activeConversationId) {
    let convo = conversations.find(convo => convo.id == activeConversationId)
    let otherMember = convo.users.find(user => user.id != currentUserId)
    activeConvoMemberId = otherMember.id
    activeConvoMemberName = otherMember.username

  }
  return (
    <div
      className={
        id === activeConversationId
          ? "conversation_card active"
          : "conversation_card"
      }
      id={conversation.id}
      style={styles.wrapper}
      onClick={e => changeActive(conversation)}
    >
      {latest_message ? (
        <ActionCable
          channel={{ channel: "ConversationChannel", conversation: id }}
          onReceived={response => {
            if (response.type === "send_message") {
              receiveNewMessage(response.payload);
              if (id === activeConversationId) {
                viewConversation(
                  activeConversationId,
                  currentUserId
                );
              }
            } else if (response.type === "rename_conversation") {
              editTitle(
                response.payload.conversation_id,
                response.payload.title,
                response.payload.message
              );
            } else if (response.type === "leave_conversation") {
              if (response.payload.user_id === currentUserId) {
                lConversation(response.payload.conversation_id);
              } else {
                receiveLConversation(
                  response.payload.conversation_id,
                  response.payload.user_id,
                  response.payload.message
                );
              }
            }
          }}
        />
      ) : null}
      <Grid style={styles.grid}>
        <Col xs={12}>
          <Row className="convo-card">
            <div className="pic-and-name">
              <img 
                // className={currentUser.member?"":"blurred"} 
                src={myPhotos[0].photo? myPhotos[0].photo:require('../../assets/blank-picture.png')} />
              <h5 style={styles.title}>{displayTitle}</h5>
            </div>
            <div className="pic-and-name" style={{alignItems: 'flex-end', position: 'relative'}}>
              {onlineMember? <OnlineDot />: ''}
              <Row style={styles.dotRow}>
                {latest_message &&
                ((latest_message.created_at > last_viewed ||
                  last_viewed === null) &&
                  latest_message.user_id !== currentUserId &&
                  activeConversationId !== id) ? (
                  <NotificationDot />
                ) : null}
              </Row>
              <p style={styles.time}>
                {latest_message ? (
                  <Moment fromNow>{latest_message.created_at}</Moment>
                ) : null}
              </p>
              <ToggleChatOptions
                memberId={activeConvoMemberId?activeConvoMemberId:""}
                memberName={activeConvoMemberName?activeConvoMemberName:""}
              />
            </div>
          </Row>
        </Col>
      </Grid>
    </div>
  );
};

const styles = {
  button: {
    float: "right",
    marginRight: "-15px",
    marginTop: "4px",
    backgroundColor: "inherit",
    border: "none",
    padding: "5px 10px 4px"
  },
  dotRow: {
    height: "20px"
  },
  glyphicon: {
    paddingTop: "4px"
  },
  grid: {
    width: "100%",
    padding: 0
  },
  time: {
    margin: "5px -15px 0"
  },
  title: {
    display: "inline-block",
    margin: 0
  },
  wrapper: {
    // backgroundColor: "#eee",
    cursor: "pointer",
    height: "110px",
    padding: "10px"
  }
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  activeConversationId: state.activeConversationId,
  currentUserId: state.currentUser.id,
  currentUser: state.currentUser,
  conversations: state.conversations
});

const mapDispatchToProps = dispatch => ({
  changeActive: id => {
    dispatch(changeActiveConversation(id));
  },
  showEditConversationModal: id => {
    dispatch(showEditConversationModal(id));
  },
  receiveNewMessage: message => {
    dispatch(receiveAddedMessage(message));
  },
  editTitle: (conversation_id, title, message) => {
    dispatch(editConversationTitle(conversation_id, title, message));
  },
  lConversation: conversation_id => {
    dispatch(leaveConversation(conversation_id));
  },
  receiveLConversation: (conversation_id, user_id, message) => {
    dispatch(receiveLeftConversation(conversation_id, user_id, message));
  },
  viewConversation: (conversation_id, user_id) => {
    dispatch(updateViewConversation(user_id, conversation_id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationCard);
