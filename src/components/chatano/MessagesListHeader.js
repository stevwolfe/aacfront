import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";
import { ActionCable } from "react-actioncable-provider";
import {
  editConversationTitle,
  showEditConversationModal,
  updateViewConversation,
  showModalUserInfos
} from "../../redux/actions";

class MessagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.title) {
      this.state = { text: this.props.title };
    } else {
      this.state = { text: "" };
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.title) {
      this.setState({ text: nextProps.title });
    } else {
      if (nextProps.users) {
        const users = nextProps.users.filter(
          user => user.id !== nextProps.currentUser.id
        );
        const userNames = users.map(
          user => `${user.username}`
        );
        this.setState({ text: userNames.join(", ") });
      } else {
        this.setState({ text: "" });
      }
    }
  };

  onSubmitHandler = (e, input) => {
    e.preventDefault();
    if (!this.state.text.trim()) {
      return;
    }
    if (this.props.title === this.state.text) {
      return;
    }
    this.refs.cable.perform("rename_conversation", {
      conversation: this.props.id,
      title: this.state.text,
      user: this.props.currentUser.id
    });
    this.props.updateViewConversation(
      this.props.currentUser.id,
      this.props.id
    );
    input.blur();
  };

  render() {
    let input;
    return (
      <div className="messages_list_header" style={styles.header}>
        <ActionCable
          ref="cable"
          channel={{
            channel: "ConversationChannel",
            conversation: this.props.activeConversationId
          }}
        />
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <h5
            onClick={() => {this.props.showModalUserInfos(this.props.fakeUser.id)}}
            style={{cursor: 'pointer'}}
            className="messages_list_header_title_input"
          >
            {this.props.fakeUser ? `You are: ${this.props.fakeUser.username}`: ""}
          </h5>
          <h5
            onClick={() => {this.props.showModalUserInfos(this.props.realMember.id)}}
            style={{cursor: 'pointer'}}
            className="messages_list_header_title_input"
          >
            {this.props.realMember ? `Speaking to: ${this.props.realMember.username}`: ""}
          </h5>
        </div>
        {this.props.id ? (
          <Button
            className="edit_conversation_button"
            style={styles.button}
            onClick={() => this.props.showEditConversationModal(this.props.id)}
          >
            <Glyphicon glyph="option-horizontal" style={styles.glyphicon} />
          </Button>
        ) : null}
      </div>
    );
  }
}

const styles = {
  button: {
    position: "absolute",
    right: "18px",
    top: "4px",
    border: "none",
    padding: "5px 10px 4px"
  },
  header: {
    boxShadow: "0 1px 3px #999",
    height: "40px",
    textAlign: "center",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
  },
  title: {
    border: 0,
    fontSize: "1.5rem",
    fontWeight: "700",
    marginTop: "9px",
    textAlign: "center",
    width: "90%"
  },
  glyphicon: {
    paddingTop: "4px"
  }
};

const mapStateToProps = ({
  conversations,
  activeConversationId,
  currentUser,
  activeConvoObject,
  fakesList
}) => {
  let fakeUser;
  let realMember;
  const currentConvo = conversations.find(c => c.id === activeConversationId);
  if (currentConvo) {
    currentConvo.users.forEach(user => {
    fakesList.forEach(fake => {
      if (fake.id == user.id) {
        fakeUser = fake
        }
      })
    })
    currentConvo.users.forEach(user => {
      if (user.username != fakeUser.username) {
        realMember = user
      }
    })
  }
  return currentConvo

    ? {
        id: currentConvo.id,
        title: currentConvo.title,
        users: activeConvoObject.users,
        currentUser: activeConvoObject.users? activeConvoObject.users[0]: "",
        fakeUser,
        realMember
      }
    : {
        id: null,
        title: null,
        users: null,
        currentUser
      };
};

const mapDispatchToProps = dispatch => ({
  editConversationTitle: (conversationId, text) => {
    dispatch(editConversationTitle(conversationId, text));
  },
  showEditConversationModal: conversationId => {
    dispatch(showEditConversationModal(conversationId));
  },
  updateViewConversation: (user_id, conversation_id) => {

    dispatch(updateViewConversation(user_id, conversation_id));
  },
  showModalUserInfos: (userId) => {
    dispatch(showModalUserInfos(userId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListHeader);
