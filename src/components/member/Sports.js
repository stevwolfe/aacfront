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
        { (this.props.showMemberPage.aerobics ||
          this.props.showMemberPage.golf ||
          this.props.showMemberPage.martialArts ||
          this.props.showMemberPage.soccer||
          this.props.showMemberPage.walking ||
          this.props.showMemberPage.bowling ||
          this.props.showMemberPage.hockey ||
          this.props.showMemberPage.rubgy  ||
          this.props.showMemberPage.swimming ||
          this.props.showMemberPage.baseball ||
          this.props.showMemberPage.cycling ||
          this.props.showMemberPage.running||
          this.props.showMemberPage.tennis ||
          this.props.showMemberPage.weight ||
          this.props.showMemberPage.basketball ||
          this.props.showMemberPage.dance  ||
          this.props.showMemberPage.skiing ||
          this.props.showMemberPage.volleyball
          )
            ?
              (<div className="basic-infos hobbies">
                <div className="title"> Sports </div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {this.props.showMemberPage.aerobics?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Aerobics </span>
                    </div>
                    : null}
                  {this.props.showMemberPage.golf?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Golf</span>
                    </div>
                    : null}
                  {this.props.showMemberPage.martialArts?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Martial Arts </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.soccer?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Soccer </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.walking?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Walking </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.bowling?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Bowling </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.hockey?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Hockey </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.rubgy?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Rubgy </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.swimming?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Swimming </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.baseball?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Baseball </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.cycling?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Cycling </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.running?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Running </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.tennis?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Tennis </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.weight?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Weight </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.basketball?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Basketball </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.dance?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Dance </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.skiing?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Skiing </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.volleyball?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Volleyball </span>
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


