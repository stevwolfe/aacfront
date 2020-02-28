import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Greeting = ({ active, handleClick }) => (
  <div className={active === "greeting" ? "greeting active" : "greeting"}>
    <Button
      bsStyle="primary"
      bsSize="large"
      block
      onClick={e => handleClick(e, "login")}
    >
      Log In
    </Button>
      <Link to="/signup">
        <Button bsSize="large" style={{backgroundColor: 'white'}} block>
          Sign Up
        </Button>
      </Link>
  </div>
);

const styles = {
  header: {
    marginTop: "10px"
  },
  subHeader: {
    color: "#888"
  }
};

export default Greeting;
