import React from 'react';
import MainNavbar from '../home/MainNavbar'
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { getMemberInfo, fetchCurrentUser, getSentSmileysList, getFavorites, createVisit } from "../../redux/actions";
import { connect } from "react-redux";
import TopPart from './TopPart';
import BasicInfos from './BasicInfos'
import Description from './Description'
import PublicPhotos from './PublicPhotos'
import PrivatePhotos from './PrivatePhotos'
import ModalPhotos from '../infos/ModalPhotos'
import '../../../src/assets/membershow.css'
import BlockedAlert from './components/BlockedAlert'
import SexualPreference from './SexualPreferences'
import Personality from './Personality'
import Sports from './Sports'
import Hobbies from './Hobbies'

class MemberShow extends React.Component   {
  state = {
    birthday: "",
  };


  componentWillMount = () => {
    const memberId = this.props.match.params.id
    this.props.getMemberInfo(memberId)
    if (this.props.currentUserId) {
      this.props.getSentSmileysList(this.props.currentUserId, this.props.match.params.id)
    }
  }

  componentWillUpdate = (prevProps) => {
    if (prevProps.currentUserId != this.props.currentUserId) {
       this.props.getSentSmileysList(prevProps.currentUserId, this.props.match.params.id)

    }
  }
  render = () =>
    (
      <div>
          <MainNavbar />
          <Row className="col-md-10 col-md-offset-1">
            <TopPart
              id={this.props.match.params.id}
              history={this.props.history}
            />
          </Row>
          <Row className='col-md-10 col-md-offset-1'>
            <div className="col-md-4 flex-sexual-pref" style={{paddingRight: '15px'}}>
              <div className='sought-and-sexual'>
                <div className=''>
                  <BasicInfos/>
                </div>
                <div className=''>
                  <SexualPreference />
                </div>
              </div>
            </div>
            <div className="col-md-8 col-xs-12" style={{float: 'right'}}><Description/></div>
            {this.props.showMemberPhotos.length?<div className="col-md-8 col-xs-12" style={{float: 'right'}}><PublicPhotos history={this.props.history}/></div>:null}
          </Row>
          <Row className='col-md-10 col-md-offset-1 col-xs-12'>
            <Personality />
            <Sports />
            <Hobbies />
          </Row>
          <ModalPhotos />
          <BlockedAlert />
      </div>
    )
}



const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    showMemberPage: state.showMemberPage,
    openBlockAlert: state.openBlockAlert,
    showMemberPhotos: state.showMemberPhotos
  }
};

const mapDispatchToProps = dispatch => ({
  getMemberInfo: memberId => {
    dispatch(getMemberInfo(memberId));
  },
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
  getSentSmileysList: (userId, memberId) => {
    dispatch(getSentSmileysList(userId, memberId))
  },
  getFavorites: (userId) => {
    dispatch(getFavorites(userId))
  },
  createVisit: (visitorId, memberId) => {
    dispatch(createVisit(visitorId, memberId))
  }

})


export default connect(mapStateToProps,mapDispatchToProps )(MemberShow);





