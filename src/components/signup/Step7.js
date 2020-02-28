import React from "react";
import { connect } from "react-redux";
import { newStep, ageRange } from "../../redux/actions";



class Step7 extends React.Component {
  render() {
    if (this.props.currentStep !== 7) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return(
      <div  style={{marginTop: '100px'}} className="form-group">
        <div class="col-sm-6 col-sm-offset-3 center-form">
          <div className="col-sm-10 col-sm-offset-1">
            <h2 class="question-title text-center">
              What age range are you most interested in?
            </h2>
          </div>
          <div class="custom-buttons">
            <button onClick={() => {this.props.newStep(), this.props.ageRange(18, 25)}} class="custom-buttons__button">
              18 - 25
            </button>
            <button onClick={() => {this.props.newStep(), this.props.ageRange(26, 35)}} class="custom-buttons__button">
              26 - 35
            </button>
            <button onClick={() => {this.props.newStep(), this.props.ageRange(36, 55)}} class="custom-buttons__button">
              36 - 55
            </button>
            <button onClick={() => {this.props.newStep(), this.props.ageRange(45, 99)}} class="custom-buttons__button">
              45 and over
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
  ageRange: (minAge, maxAge) => {
    dispatch(ageRange(minAge, maxAge));
  },
});

export default connect(null, mapDispatchToProps)(Step7);
