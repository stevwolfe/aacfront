import React from 'react';
import EditInfoLeft from './EditInfoLeft'
import EditInfoRight from './EditInfoRight'
import MainNavbar from '../home/MainNavbar'
import PhysicalInfo from './PhysicalInfo'
import SaveInfos from '../home/SaveInfos'
import '../../assets/infos.css'
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { getUserDetails, fetchCurrentUser } from "../../redux/actions";
import { connect } from "react-redux";
import ProfilePicture from './ProfilePicture'
import SexualPractices from './SexualPractices'
import Personality from './Personality'
import Sports from './Sports'
import Hobbies from './Hobbies'

class EditInfo extends React.Component   {
  state = {
    birthday: "",
    description: "",
    eyeColor: "",
    hairColor: "",
    height: "",
    lookingExciting: "",
    lookingLong: "",
    lookingShort: "",
    lookingUndecided: "",
    lookingVirtual: "",
    maritalStatus: "",
    smoker: "",
    age: ""
  };

  componentWillMount = () => {
    if (this.props.currentUserId) {
      this.props.getUserDetails(this.props.currentUserId)
      this.setState({age: this.props.currentUser.age})
    }
    else {

      this.props.fetchCurrentUser()
    }
    if (!this.props.currentUserId) {
      this.props.fetchCurrentUser()
    }
  }


  componentWillReceiveProps= (nextProps)  => {
    if (this.props.currentUserId != nextProps.currentUserId && nextProps.currentUserId) {
      const userId = nextProps.currentUserId
      this.setState({age: nextProps.currentUser.age})
      this.props.getUserDetails(userId)
    }
    const userDetails = nextProps.userDetails
    this.setState({
                    birthday: userDetails.birthday,
                    description: userDetails.description,
                    maritalStatus: userDetails.maritalStatus,
                  })
  }

  render = () =>
    (
      <div className="edit-info">
          <MainNavbar />
          <Row  style={{margin: "50px"}}>
            <div className="col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
              <div className="col-sm-5 col-sm-offset-1  boxes-infos">
                <ProfilePicture />
              </div>
              <div className="col-sm-5 col-sm-offset-1 boxes-infos">
                <EditInfoLeft
                  description={this.state.description}
                  birthday={this.state.birthday}
                  maritalStatus={this.state.maritalStatus}
                  age={this.props.currentUser.age}
                />
              </div>
            </div>
          </Row>
          <Row style={{margin: "50px"}}>
            <div className="col-sm-10 col-sm-offset-1  col-lg-8 col-lg-offset-2">
              <div className="col-sm-5 col-sm-offset-1 boxes-infos">
                <EditInfoRight />
              </div>
              <div className="col-sm-5 col-sm-offset-1 boxes-infos">
                <PhysicalInfo />
              </div>
            </div>
          </Row>
          <Row style={{margin: "25px"}}>
            <div className="col-sm-10 col-sm-offset-1  col-lg-8 col-lg-offset-2">
              <div className="col-sm-11 col-sm-offset-1">
                <Personality />
              </div>
            </div>
          </Row>
          <Row style={{margin: "25px"}}>
            <div className="col-sm-10 col-sm-offset-1  col-lg-8 col-lg-offset-2">
              <div className="col-sm-11 col-sm-offset-1">
                <SexualPractices />
              </div>
            </div>
          </Row>
          <Row style={{margin: "25px"}}>
            <div className="col-sm-10 col-sm-offset-1  col-lg-8 col-lg-offset-2">
              <div className="col-sm-11 col-sm-offset-1">
                <Sports />
              </div>
            </div>
          </Row>
          <Row style={{margin: "25px"}}>
            <div className="col-sm-10 col-sm-offset-1  col-lg-8 col-lg-offset-2">
              <div className="col-sm-11 col-sm-offset-1">
                <Hobbies />
              </div>
            </div>
          </Row>
      </div>
    )
}



const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    userDetails: state.userDetails,
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => {
    dispatch(getUserDetails(userId));
  },
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(EditInfo);





