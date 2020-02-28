import React from "react";
import { connect } from "react-redux";
import MainNavbar from "../home/MainNavbar";
import { sendSmiley, getSentSmileysList } from "../../redux/actions";
import SearchBar from './SearchBar'
import '../../assets/search.css'
import { Link } from "react-router-dom";


class SearchMemberCard extends React.Component {

  state = { sentSmileysList: []}

  componentDidMount = () => {
    this.props.getSentSmileysList(this.props.currentUser.id)
    let sentSmileysList = []
    this.props.smileysSentList.filter(obj => {
        if (obj.receiver === this.props.id) {
          sentSmileysList.push(obj)
        }
    this.setState({sentSmileysList})
    })
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.smileysSentList != this.props.smileysSentList) {
      let sentSmileysList = []
      prevProps.smileysSentList.filter(obj => {
        if (obj.receiver === this.props.id) {
          sentSmileysList.push(obj)
        }

      })
    this.setState({sentSmileysList})
    }
  }



  render = () => {
    return (
      <div className="match-card">
        <Link to={`/member/${this.props.id}`}>
          <div className="image">
            {this.props.online?<img className="online" src={require('../../assets/icons8-online-48.png')} />:null}
            <img 
              className="match-card-image"
              // className={this.props.member?"match-card-image":"match-card-image blurred"}
              src={this.props.photo}
            />
          </div>
        </Link>
        <div className="info">
          <div>
            <h3> {this.props.firstName} </h3>
            <h4> {this.props.age} </h4>
          </div>
        {this.state.sentSmileysList.length?
          <img className="winker" src={require("../../assets/winker-yellow.png")}/>:
          <img
            className="winker"
            src={require("../../assets/winker-black.png")}
            onClick={() => {this.props.sendSmiley(this.props.id, this.props.currentUser.id)}}
          />
        }
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  smileysSentList: state.smileysSentList
});

const mapDispatchToProps = dispatch => ({
  sendSmiley: (memberId, userId) => {
    dispatch(sendSmiley(memberId, userId))
  },
  getSentSmileysList: (userId) => {
    dispatch(getSentSmileysList(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchMemberCard);
