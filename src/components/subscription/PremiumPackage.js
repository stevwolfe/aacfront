import React from "react";
import { connect } from "react-redux";
import MainNavbar from "../home/MainNavbar";
import { fetchCurrentUser, noToken, fetchMembers } from "../../redux/actions";
import '../../assets/subscription.css'



export default class TablePremium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList : []
    }
  }

  // componentDidMount = () => {
  //   console.log(this.props.showMembersSearch, "showMembersSearch")
  // }


  render = () => {

    return (
      <div className="col-sm-8 col-sm-offset-2 premium-package">
        <div className="row" style={{marginBottom: "25px"}}>
          <div className="col-sm-6 col-sm-offset-3">
            <div className="col-sm-3">
              <img className="img-sub" src={require('../../assets/speech-bubble.png')}/>
            </div>
            <div className="col-sm-6">
              <h5>Unlimited Messages and Gifts</h5>
            </div>
            <div className="col-sm-3">
              <img className="img-sub" src={require('../../assets/tick.png')}/>
            </div>
          </div>
        </div>
        <div className="row" style={{marginBottom: "25px"}}>
          <div className="col-sm-6 col-sm-offset-3">
            <div className="col-sm-3">
              <img className="img-sub" src={require('../../assets/diamond.png')}/>
            </div>
            <div className="col-sm-6">
              <h5>Premium Badge and Karma Boost</h5>
            </div>
            <div className="col-sm-3">
              <img className="img-sub" src={require('../../assets/tick.png')}/>
            </div>
          </div>
        </div>
        <div className="row" style={{marginBottom: "25px"}}>
          <div className="col-sm-6 col-sm-offset-3">
            <div className="col-sm-3">
              <img className="img-sub" src={require('../../assets/instagram.png')}/>
            </div>
            <div className="col-sm-6">
              <h5>Access Member Pictures</h5>
            </div>
            <div className="col-sm-3">
              <img className="img-sub" src={require('../../assets/tick.png')}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

