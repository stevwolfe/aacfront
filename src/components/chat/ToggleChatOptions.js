import React from 'react';
import {Row, Col, Dropdown, Glyphicon, Modal, Button} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../../../src/assets/navbar.css'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { blockMember, API_ROOT, headers} from "../../redux/actions";

const styles = {
  glyphicon: {
    paddingTop: "4px",
    position: 'absolute'
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    zIndex: 10,
    position: 'absolute',
    top: 40,
    right: 0,
    left: 0,
    padding: 10,
  },
  fake: {
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing(3),
    },
  },
}));

class ToggleConversation extends React.Component   {

  state={
    open: false,
    memberName: 'Paul',
    openModal: false
  }

  hideModal = () => {
        this.setState({openModal: !this.state.openModal})

  }

  handleBlock = () => {
    this.setState({openModal: !this.state.openModal})
    this.props.blockMember(this.props.currentUser.id, this.props.memberId)
  }

  handleLogout = () => {
    this.setState({open: !this.state.open,
                   openModal: !this.state.openModal,
                   memberName: this.props.memberName
                  })
    const userId = this.props.currentUser.id
  }


  handleClick = () => {
    this.setState({open: !this.state.open})
  };

  handleClickAway = () => {
    this.setState({open: false})
  };

  render = () => {
    return (
      <div style={{ width: '150px', cursor: 'pointer', zIndex:'2'}}>
        <div class="">
          <div className="glyphicon-chat" onClick={this.handleClick}>
            <Glyphicon glyph="option-horizontal" style={styles.glyphicon} />
          </div>
          </div>
            <div className="toggle-chat">
              {this.state.open?
                <ul class='list-chat-options'>
                  <Link to={`/member/${this.props.memberId}`}><li className="border">See Profile</li></Link>
                  <li onClick={this.handleLogout} style={{borderBottom:'none', color: 'red'}}>Block User</li>
                 </ul>
                :null
              }
            </div>
            <Modal show={this.state.openModal}>
              <Modal.Dialog style={{height: '320px'}}>
                <Modal.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <img style={{margin: '30px', width: '60px'}} src={require('../../assets/exclamation-mark.png')} />
                  <p>{`Are you sure you would like to block ${this.state.memberName}?`}</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={this.hideModal} variant="secondary">Close</Button>
                  <Button
                    onClick={() => this.handleBlock()}
                    bsStyle="danger">Block user
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
};

const mapDispatchToProps = dispatch => ({
  blockMember: (userId, memberId) => {
    dispatch(blockMember(userId, memberId))
  }

})


export default connect(mapStateToProps, mapDispatchToProps )(ToggleConversation);
