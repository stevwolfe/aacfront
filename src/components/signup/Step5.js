import React from "react";
import { connect } from "react-redux";
import { newStep, genderMember } from "../../redux/actions";



class Step5 extends React.Component {
  render() {
    if (this.props.currentStep !== 5) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return(
      <div  style={{marginTop: '100px'}} className="form-group">
        <div class="col-sm-6 col-sm-offset-3 center-form">
          <div className="col-sm-10 col-sm-offset-1">
            <h2 class="question-title text-center">
              What is your gender?
            </h2>
          </div>
          <div class="custom-buttons">
            <button onClick={() => {this.props.newStep(), this.props.genderMember('male')}} class="custom-buttons__button">
              Man
            </button>
            <button onClick={() => {this.props.newStep(), this.props.genderMember('female')}} class="custom-buttons__button">
              Woman
            </button>
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
  genderMember: (gender) => {
    dispatch(genderMember(gender));
  },
});

export default connect(null, mapDispatchToProps)(Step5);
