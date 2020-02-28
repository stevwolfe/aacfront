import React from 'react';
import MainNavbar from '../home/MainNavbar'
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TopPart from './TopPart';
import '../../../src/assets/membershow.css'

class BasicInfos extends React.Component   {
  state = {
    birthday: "",
  };

  componentWillMount = () => {
    console.log(this.props.showMemberPage, "from basic")
  }
  render = () => {
    return (
      <div>
        { (this.props.showMemberPage.lookingAnything ||
          this.props.showMemberPage.lookingLong ||
          this.props.showMemberPage.lookingShort ||
          this.props.showMemberPage.lookingExciting||
          this.props.showMemberPage.lookingUndecided ||
          this.props.showMemberPage.lookingVirtual)?

              <div className="basic-infos">
                <div className="title"> SOUGHT </div>
                {this.props.showMemberPage.lookingAnything?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Open to anything </span>
                  </div>
                  : null}
                {this.props.showMemberPage.lookingLong?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Long Term </span>
                  </div>
                  : null}
                {this.props.showMemberPage.lookingShort?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Short Term </span>
                  </div>
                  : null}
               {this.props.showMemberPage.lookingExciting?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Anything exciting </span>
                  </div>
                  : null}
               {this.props.showMemberPage.lookingUndecided?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Not Sure </span>
                  </div>
                  : null}
               {this.props.showMemberPage.lookingVirtual?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Virtual </span>
                  </div>
                  : null}
            </div>
          : null
        }
      </div>)
    }
  }


const mapStateToProps = state => {
  return {
    showMemberPage: state.showMemberPage
  }
};


export default connect(mapStateToProps, null)(BasicInfos);


