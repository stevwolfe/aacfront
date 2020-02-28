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
  fetchConversationsPvt,
  fetchMessagesForActiveConversationPvt,
  updateViewConversation,
  receiveAddedConversation,
  receiveAddedMessage,
  receiveAddedUsers,
  pushInitialMessage,
  fetchCurrentUser,
  changeActiveConversation,
  resetNotifsMessages,
  fetchFakeUsers,
  resetConversationsPvt,
  addNewFakeToList,
  cleanDoublons
} from "../../redux/actions";
import EditConversationModal from "./EditConversationModal";
import MainNavbar from '../home/MainNavbar'
import ModalUserInfos from './ModalUserInfos'


class ChatAreaContainer extends React.Component {

  componentWillMount = () => {
    this.props.fetchFakeUsers()

  }

  componentDidMount = () => {
      // this.props.fetchFakeUsers()
      this.props.resetNotifsMessages()
      if (this.props.fakesList.length) {
       this.props.fakesList.forEach(fake => this.props.fetchConversationsPvt(fake.id))
        // sequentialStart()
      }
  }

  componentWillUnmount = () => {
    this.props.resetConversationsPvt()
  }
  componentWillReceiveProps = nextProps => {


    if (this.props.fakesList != nextProps.fakesList) {
      let nextPropsLength = nextProps.fakesList.length 
      if (nextPropsLength - this.props.fakesList.length === 1) {
        let fakeListLength = nextProps.fakesList.length - 1
        let newFake = nextProps.fakesList[fakeListLength]
        this.props.fetchConversationsPvt(newFake.id)
      } else {

        nextProps.fakesList.forEach(fake => this.props.fetchConversationsPvt(fake.id))
        this.props.cleanDoublons(nextProps.conversations)
      }

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
        nextProps.activeConversationId,
        activeConversation
      );
    }

    // update conversation's last_checked time every time a new conversation is opened
    if (
      activeConversation &&
      ((nextProps.activeConversationId !== this.props.activeConversationId &&
        activeConversation.last_viewed) ||
        activeConversation.new)
    ) {
      let user;
      nextProps.conversations.map( convo => {
        return convo.id == activeConversation.id && convo.users[1]? user = convo.users[1].id : ''}
      )

      this.props.updateViewConversation(

        user,
        nextProps.activeConversationId

      );
    }
  };

  render = () => (
    <Grid>
      <ActionCable
        channel={{
          channel: "NewConversationAllChannel",
          user: this.props.currentUserId
        }}
        onReceived={response => {

          if (response.type === "new_conversation") {
            if (
              !this.props.conversations.find(c => c.id === response.payload.id)
            ) {
              this.props.addedConversation(response.payload);
              this.props.addingNewFakeToList(response.new_fake);
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
      <Row style={styles.topRow}>
        <Col sm={3} style={styles.col}>
          <ConversationsList />
        </Col>
        <Col sm={9} style={styles.col}>
          <MessagesList />
        </Col>
      </Row>
      <Row>
        <InputField />
      </Row>
      <ModalUserInfos />
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
  convoSelectedFromShow: state.convoSelectedFromShow,
  activeConvoObject: state.activeConvoObject,
  fakesList: state.fakesList
});

const mapDispatchToProps = dispatch => ({
  fetchConversationsPvt: userId => {
    dispatch(fetchConversationsPvt(userId));
  },
  fetchMessagesForActiveConversation: (activeConversationId, convoObject) => {
    dispatch(fetchMessagesForActiveConversationPvt(activeConversationId, convoObject));
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
  },
  fetchFakeUsers: () => {
    dispatch((fetchFakeUsers()))
  },
  resetConversationsPvt: () => {
    dispatch(resetConversationsPvt())
  },
  addingNewFakeToList: (newFake) => {
    dispatch(addNewFakeToList(newFake))
  },
  cleanDoublons: (fakesList) => {
    dispatch(cleanDoublons(fakesList))
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(ChatAreaContainer);
