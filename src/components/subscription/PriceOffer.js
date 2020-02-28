import React from "react";
import { connect } from "react-redux";
import MainNavbar from "../home/MainNavbar";
import { fetchCurrentUser, noToken, fetchMembers } from "../../redux/actions";
import '../../assets/subscription.css'



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
      <div className="col-sm-8 col-sm-offset-2">
        <img className="premium-photo" src={require('../../assets/secret-woman.jpg')} />
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
