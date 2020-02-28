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
  }
  render = () => {
    return (
      <div>
        { (this.props.showMemberPage.shy ||
          this.props.showMemberPage.sociable ||
          this.props.showMemberPage.modest ||
          this.props.showMemberPage.fun||
          this.props.showMemberPage.generous ||
          this.props.showMemberPage.spiritual ||
          this.props.showMemberPage.moody ||
          this.props.showMemberPage.relaxed  ||
          this.props.showMemberPage.sensitive)
            ?
              (<div className="basic-infos hobbies">
                <div className="title"> PERSONALITY </div>
                <div style={{display: 'flex'}}>
                  {this.props.showMemberPage.shy?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Shy </span>
                    </div>
                    : null}
                  {this.props.showMemberPage.sociable?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Sociable</span>
                    </div>
                    : null}
                  {this.props.showMemberPage.modest?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Modest </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.fun?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Fun </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.generous?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Generous </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.spiritual?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Spiritual </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.moody?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Moody </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.relaxed?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Relaxed </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.sensitive?
                    <div className="sought" style={{flex: '30%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Sensitive </span>
                    </div>
                    : null}
                </div>
            </div>)
          :null
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


