import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import MessagesList from "./MessagesList";
import ConversationsList from "./ConversationsList";
import InputField from "./InputField";
import NewConversationModal from "./NewConversationModal";
import UserProfileModal from "./UserProfileModal";
import {
  fetchConversations,
  fetchMessagesForActiveConversation,
  updateViewConversation,
  receiveAddedConversation,
  receiveAddedMessage,
  receiveAddedUsers,
  pushInitialMessage,
  fetchCurrentUser,
  changeActiveConversation,
  resetNotifsMessages
} from "../../redux/actions";
import EditConversationModal from "./EditConversationModal";
import MainNavbar from '../home/MainNavbar'
import ModalNoRemainingMessages from './ModalNoRemainingMessages'


class ChatAreaContainer extends React.Component {


  componentDidMount = () => {
      if (!this.props.currentUserId){
        this.props.fetchCurrentUser()
      }

      this.props.fetchConversations(this.props.currentUserId)


      this.props.resetNotifsMessages()

    // if (this.props.convoSelectedFromShow) {
    //   console.log(this.props.convoSelectedFromShow, 'this.props.convoSelectedFromShow')
    //  document.getElementById(`"${this.props.convoSelectedFromShow}"`).click()
    // }
  }

  componentWillReceiveProps = nextProps => {
    // if (this.props.convoSelectedFromShow != nextProps.convoSelectedFromShow) {
    //   changeActiveConversation(nextProps.convoSelectedFromShow)
    // }

    if (this.props.currentUserId != nextProps.currentUserId && nextProps.currentUserId) {
      const id = nextProps.currentUserId;
      // this.props.fetchConversations(id);
    }
    const activeConversation = nextProps.conversations.find(
      c => c.id === nextProps.activeConversationId
    );
    if (
      activeConversation &&
      ((!activeConversation.loading &&
        !activeConversation.messages.length &&
        activeConversation.last_viewed) ||
        activeConversation.new)
    ) {
      this.props.fetchMessagesForActiveConversation(
        nextProps.activeConversationId
      );
    }

    // update conversation's last_checked time every time a new conversation is opened
    if (
      activeConversation &&
      ((nextProps.activeConversationId !== this.props.activeConversationId &&
        activeConversation.last_viewed) ||
        activeConversation.new)
    ) {
      this.props.updateViewConversation(
        this.props.currentUserId,
        nextProps.activeConversationId
      );
    }
  };

  render = () => (
    <Grid>
      <ActionCable
        channel={{
          channel: "NewConversationChannel",
          user: this.props.currentUserId
        }}
        onReceived={response => {
          if (response.type === "new_conversation") {
            if (
              !this.props.conversations.find(c => c.id === response.payload.id)
            ) {
              this.props.addedConversation(response.payload);
            } else {
              this.props.pushInitial(response.message);
            }
          } else if (response.type === "add_users") {
            if (
              !this.props.conversations.find(
                c => c.id === response.payload.conversation.id
              )
            ) {
              this.props.addedConversation(response.payload.conversation);
            } else {
              this.props.addedMessage(response.payload.message);
              this.props.addedUsers(
                response.payload.conversation.id,
                response.payload.added_users
              );
            }
          }
        }}
      />
      <MainNavbar />
      <div style={{position: 'relative'}}>
        <ModalNoRemainingMessages />
        <Row style={styles.topRow}>
          <Col sm={3} style={styles.col}>
            <ConversationsList ref='conversationsList' />
          </Col>
          <Col sm={9} style={styles.col}  id='messagesList'>
            <MessagesList/>
          </Col>
        </Row>
        <Row style={styles.col}  id='messagesListSm' style={{padding: '15px'}}>
          <MessagesList id='messagesList'/>
        </Row>
        <Row className='inputfield-sm' >
          <InputField />
        </Row>
      </div>
        <NewConversationModal />
        <UserProfileModal />
        <EditConversationModal />
    </Grid>
  );
}

const styles = {
  topRow: {
    height: "calc(100vh - 150px)",
    marginTop: "20px"
  },
  col: {
    height: "100%"
  }
};

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  activeConversationId: state.activeConversationId,
  conversations: state.conversations,
  convoSelectedFromShow: state.convoSelectedFromShow
});

const mapDispatchToProps = dispatch => ({
  fetchConversations: userId => {
    dispatch(fetchConversations(userId));
  },
  fetchMessagesForActiveConversation: activeConversationId => {
    dispatch(fetchMessagesForActiveConversation(activeConversationId));
  },
  updateViewConversation: (userId, conversationId) => {
    dispatch(updateViewConversation(userId, conversationId));
  },
  addedConversation: conversation => {
    dispatch(receiveAddedConversation(conversation));
  },
  addedMessage: message => {
    dispatch(receiveAddedMessage(message));
  },
  addedUsers: (conversation_id, users) => {
    dispatch(receiveAddedUsers(conversation_id, users));
  },
  pushInitial: message => {
    dispatch(pushInitialMessage(message))
  },
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
  changeActiveConversation: (id) => {
    dispatch(changeActiveConversation(id))
  },
  resetNotifsMessages: () => {
    dispatch(resetNotifsMessages())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatAreaContainer);
