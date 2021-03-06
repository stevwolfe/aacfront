import React from "react";
import { connect } from "react-redux";
import { newStep } from "../../redux/actions";



class Step4 extends React.Component {
  render() {
    if (this.props.currentStep !== 4) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return(
      <div  style={{marginTop: '100px'}} className="form-group">
        <div class="col-sm-6 col-sm-offset-3 center-form">
          <div className="col-sm-10 col-sm-offset-1">
            <h2 class="question-title text-center">
              Be careful, you are likely to recognize people. Thank you for staying discreet.
            </h2>
          </div>
          <div class="custom-buttons">
            <button onClick={() => {this.props.newStep()}} class="custom-buttons__button">
              I understood
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
});

export default connect(null, mapDispatchToProps)(Step4);
