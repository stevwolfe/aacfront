import React from "react";
import { connect } from "react-redux";
import { newStep, genderInterest} from "../../redux/actions";



class Step6 extends React.Component {
  render() {
    if (this.props.currentStep !== 6) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return(
      <div  style={{marginTop: '100px'}} className="form-group">
        <div class="col-sm-6 col-sm-offset-3 center-form">
          <div className="col-sm-10 col-sm-offset-1">
            <h2 class="question-title text-center">
              What are you interested in?
            </h2>
          </div>
          <div class="custom-buttons">
            <button onClick={() => {this.props.newStep(), this.props.genderInterest('female')}} class="custom-buttons__button">
              Women
            </button>
            <button onClick={() => {this.props.newStep(), this.props.genderInterest('male')}} class="custom-buttons__button">
              Men
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
  genderInterest: (gender) => {
    dispatch(genderInterest(gender));
  },
});

export default connect(null, mapDispatchToProps)(Step6);
