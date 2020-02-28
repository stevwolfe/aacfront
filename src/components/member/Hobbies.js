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
        { (this.props.showMemberPage.arts ||
          this.props.showMemberPage.cooking ||
          this.props.showMemberPage.networking ||
          this.props.showMemberPage.hiking||
          this.props.showMemberPage.videoGames ||
          this.props.showMemberPage.book ||
          this.props.showMemberPage.diningOut ||
          this.props.showMemberPage.movies  ||
          this.props.showMemberPage.nightclubs ||
          this.props.showMemberPage.religion ||
          this.props.showMemberPage.charities ||
          this.props.showMemberPage.museums||
          this.props.showMemberPage.shopping ||
          this.props.showMemberPage.wine ||
          this.props.showMemberPage.coffee ||
          this.props.showMemberPage.gardening  ||
          this.props.showMemberPage.pets ||
          this.props.showMemberPage.music
          )
            ?
              (<div className="basic-infos hobbies">
                <div className="title"> HOBBIES </div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {this.props.showMemberPage.arts?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Arts </span>
                    </div>
                    : null}
                  {this.props.showMemberPage.cooking?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Cooking</span>
                    </div>
                    : null}
                  {this.props.showMemberPage.networking?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Networking </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.hiking?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Hiking </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.videoGames?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Video Games </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.book?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Reading </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.diningOut?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Dining Out </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.movies?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Movies </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.nightclubs?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Night Clubs </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.religion?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Religion </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.charities?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Charities </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.museums?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Museums </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.shopping?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Shopping </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.wine?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Wine </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.coffee?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Coffee </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.gardening?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Gardening </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.pets?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Pets </span>
                    </div>
                    : null}
                 {this.props.showMemberPage.music?
                    <div className="sought" style={{flex: '40%'}}>
                      <img src={require("../../assets/check.png")}/>
                      <span> Music </span>
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


