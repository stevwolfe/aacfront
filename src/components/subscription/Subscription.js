import React from "react";
import { connect } from "react-redux";
import MainNavbar from "../home/MainNavbar";
import { fetchCurrentUser, noToken, fetchMembers } from "../../redux/actions";
import '../../assets/subscription.css'
import PremiumPackage from './PremiumPackage'
import Testimonials from './Testimonials'
import  PriceOffer from './PriceOffer'



class Subscription extends React.Component {
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
      <div id="">
        <div className="row">
          <PriceOffer />
        </div>
        <div className="row">
          <PremiumPackage />
        </div>
        <div className="row">
          <Testimonials />
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  loggedIn: state.isLoggedIn,
  currentUser: state.currentUser,
  showMembersSearch: state.showMembersSearch
});

// const mapDispatchToProps = dispatch => ({
//   fetchCurrentUser: () => {
//     dispatch(fetchCurrentUser());
//   },
//   noToken: () => {
//     dispatch(noToken());
//   },
//   fetchMembers: (minAge, maxAge, userId) => {
//     dispatch(fetchMembers(minAge, maxAge, userId))
//   }
// });

export default connect(mapStateToProps, null)(Subscription);
