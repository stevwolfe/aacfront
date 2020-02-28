import React from 'react';
import MainNavbar from '../home/MainNavbar'
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TopPart from './TopPart';
import '../../../src/assets/membershow.css'


class Description extends React.Component   {
  state = {
    birthday: "",
  };

  // componentWillMount = () => {
  //   console.log(this.props.match.params.id, "from mmber")
  //   const memberId = this.props.match.params.id
  //   this.props.getMemberInfo(memberId)
  // }
  render = () =>
  {
    return (
            <div>
              {this.props.showMemberPage.description?
                <div className="basic-infos">
                  <div className="title">Description</div>
                  <div className="description">
                    {this.props.showMemberPage.description}
                  </div>
                </div> : null
              }
            </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    showMemberPage: state.showMemberPage
  }
};


export default connect(mapStateToProps, null)(Description);
