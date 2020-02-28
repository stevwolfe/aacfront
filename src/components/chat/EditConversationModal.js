import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import {Link} from 'react-router-dom';
import {
  hideEditConversationModal,
  leaveConversation,
  updateViewConversation,
  blockMemberFromConvo
} from "../../redux/actions";
import Typeahead from "./Typeahead";

class EditConversationModal extends React.Component {
  state = {
    title: "",
    selected: []
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.conversation && nextProps.conversation.title) {
      this.setState({ title: nextProps.conversation.title });
    }
  };
  handleSelect = selected => {
    this.setState({ selected });
  };
  handleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleDelete = e => {
    if (this.props.conversation) {
      this.refs.cable.perform("leave_conversation", {
        conversation: this.props.conversation.id,
        user: this.props.currentUser.id
      });
      this.props.blockMemberFromConvo(this.props.conversation.id)
    }
    this.props.hide();
  };
  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.title.trim() &&
      this.state.title !== this.props.conversation.title
    ) {
      this.refs.cable.perform("rename_conversation", {
        conversation: this.props.conversation.id,
        title: this.state.title,
        user: this.props.currentUser.id
      });
    }
    if (this.state.selected.length) {
      this.refs.newCable.perform("add_users", {
        conversation: this.props.conversation.id,
        users: this.state.selected.map(u => u.id),
        current_user: this.props.currentUser.id,
        other_users: this.props.conversation.users
          .map(u => u.id)
          .filter(id => id !== this.props.currentUser.id)
      });
    }
    if (this.props.conversation.id === this.props.activeConversationId) {
      this.props.updateViewConversation(
        this.props.currentUser.id,
        this.props.conversation.id
      );
    }
    this.props.hide();
    this.setState({ selected: [] });
  };
  render = () => {
    return (
      <Modal show={this.props.isShown} onHide={this.props.hide}>
        {this.props.conversation ? (
          <ActionCable
            ref="cable"
            channel={{
              channel: "ConversationChannel",
              conversation: this.props.conversation.id
            }}
          />
        ) : null}
        <ActionCable
          ref="newCable"
          channel={{
            channel: "NewConversationChannel",
            user: this.props.currentUser.id
          }}
        />
        <form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body style={{display: 'flex', justifyContent: 'space-arround'}}>
            <Button bsStyle="success" onClick = {this.props.hide}>
              <Link to=""> See Profile </Link>
            </Button>
            <Button bsStyle="danger" onClick={this.handleDelete}>
              Leave Conversation
            </Button>
          </Modal.Body>
        </form>
      </Modal>
    );
  };
}

function mapStateToProps(state) {
  let conversation;
  if (state.showEditConversationModal.isShown) {
    conversation = state.conversations.find(
      c => c.id === state.showEditConversationModal.conversationId
    );
  }
  return {
    isShown: state.showEditConversationModal.isShown,
    conversation,
    currentUser: state.currentUser,
    activeConversationId: state.activeConversationId
  };
}

const mapDispatchToProps = dispatch => ({
  hide: () => {
    dispatch(hideEditConversationModal());
  },
  leaveConversation: (conversationId, userId) => {
    dispatch(leaveConversation(conversationId, userId));
  },
  updateViewConversation: (userId, conversationId) => {
    dispatch(updateViewConversation(userId, conversationId));
  },
  blockMemberFromConvo: (userId, memberId) => {
    dispatch(blockMemberFromConvo(userId, memberId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  EditConversationModal
);
