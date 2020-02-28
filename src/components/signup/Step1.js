import React from "react";
import { connect } from "react-redux";
import { newStep } from "../../redux/actions";
import NavbarSignup from './NavbarSignup'



class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return(
      <div style={{marginTop: '100px'}}>
        <div className="form-group">
          <div class="col-sm-6 col-sm-offset-3 center-form">
            <div className="col-sm-10 col-sm-offset-1">
              <h2 class="question-title text-center">Are you over 18 years old ?</h2>
            </div>
            <div class="custom-buttons">
              <button onClick={() => {this.props.newStep()}} class="custom-buttons__button">
                Yes
              </button>
              <button onClick={() => {this.props.newStep()}} class="custom-buttons__button">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => ({
  newStep: () => {
    dispatch(newStep());
  },
});

export default connect(null, mapDispatchToProps)(Step1);
