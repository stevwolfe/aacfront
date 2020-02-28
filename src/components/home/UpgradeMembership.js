import React from 'react';
import {Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../../../src/assets/membershow.css'


export default class UpgradeMembership extends React.Component   {
  state = {
    birthday: "",
  };

  // componentWillMount = () => {
  //   console.log(this.props.match.params.id, "from mmber")
  //   const memberId = this.props.match.params.id
  //   this.props.getMemberInfo(memberId)
  // }

  render = () =>
    (
    <div id="coaching-box" class="upgrademembership corncob ">
        <div class="message" style={{display: 'flex'}}>
          <figure></figure>
          <div className='upgrade-letters'>
            <h5>Upgrade your</h5>
            <h5 style={{marginTop: '0px'}}><strong>MEMBERSHIP</strong></h5>
          </div>
          <button type="button">Upgrade Now!</button>
          </div>
        <div class="content">
        </div>
    </div>
    )
}


// const mapStateToProps = state => {
//   return {
//     currentUser: state.currentUser
//   }
// };


// export default connect(mapStateToProps, null)(Description);






      // <div class="upgrade-membership">
      //     <div class="message">
      //       <h5>Upgrade your</h5>
      //       <h4><strong>MEMBERSHIP</strong></h4>
      //     </div>
      //       <button type="button">Upgrade Now!</button>
      //     <div class="content">
      //     </div>
      // </div>
