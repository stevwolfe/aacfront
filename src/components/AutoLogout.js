import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {API_ROOT, headers} from "../redux/actions";


class AutoLogout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { logginStatus: true };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];

    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    // this.warnTimeout = setTimeout(this.warn, 5 * 1000);

    this.logoutTimeout = setTimeout(this.logout, 10 * 60000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    alert("You will be logged out automatically in 1 minute.");
  }

  logout() {
    // Send a logout request to the API
    const userId = this.props.currentUserId
    fetch(`${API_ROOT}/logout`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(localStorage.removeItem("token"))
    window.location.href = "/";
    this.setState({ logginStatus: false });
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }
  render() {
    return (
      <div className="" style={{zIndex: '-1'}}>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id
});

export default connect(mapStateToProps, null)(AutoLogout);

