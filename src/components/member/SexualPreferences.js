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
        { (this.props.showMemberPage.anythingGoes ||
          this.props.showMemberPage.beingDominated ||
          this.props.showMemberPage.dominating ||
          this.props.showMemberPage.normal||
          this.props.showMemberPage.threesome ||
          this.props.showMemberPage.beingBlind ||
          this.props.showMemberPage.costume ||
          this.props.showMemberPage.rolePlaying  ||
          this.props.showMemberPage.usingSexToys ||
          this.props.showMemberPage.unusualPlaces ||
          this.props.showMemberPage.beingWatched ||
          this.props.showMemberPage.willingExperiment
          )?

              <div className="basic-infos">
                <div className="title"> SEXUAL PREFERENCES </div>
                {this.props.showMemberPage.anythingGoes?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Anything Goes </span>
                  </div>
                  : null}
                {this.props.showMemberPage.beingDominated?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Being Dominated</span>
                  </div>
                  : null}
                {this.props.showMemberPage.dominating?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Dominating </span>
                  </div>
                  : null}
               {this.props.showMemberPage.normal?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Normal </span>
                  </div>
                  : null}
               {this.props.showMemberPage.threesome?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Threesome </span>
                  </div>
                  : null}
               {this.props.showMemberPage.beingBlind?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Being Blind </span>
                  </div>
                  : null}
               {this.props.showMemberPage.costume?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Wear Costumes </span>
                  </div>
                  : null}
               {this.props.showMemberPage.rolePlaying?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Role Playing </span>
                  </div>
                  : null}
               {this.props.showMemberPage.usingSexToys?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Using Sex Toys </span>
                  </div>
                  : null}
               {this.props.showMemberPage.unusualPlaces?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Unusal Places</span>
                  </div>
                  : null}
               {this.props.showMemberPage.beingWatched?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Being Watched</span>
                  </div>
                  : null}
               {this.props.showMemberPage.willingExperiment?
                  <div className="sought">
                    <img src={require("../../assets/check.png")}/>
                    <span> Willing To Experiment</span>
                  </div>
                  : null}
            </div>
          :
          <div className="basic-infos">
            <div className="title"> SEXUAL PREFERENCES </div>
              <div className="sought">
                <img src={require("../../assets/check.png")}/>
                <span> Secret</span>
              </div>
          </div>
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


