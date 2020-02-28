import React from "react";
import { Link } from "react-router-dom";



export default class NavbarSignup extends React.Component {
  render() {
    // The markup for the Step 1 UI
    return(
      <div className="col-sm-8 col-sm-offset-2 flex-nav-signup">
        <div style={{color: '#d74894'}}> LOGO </div>
        <div className="nav-signup">
          <Link className="" to='/welcome'> Already a member?</Link>
        </div>
      </div>
    )
  }
}

