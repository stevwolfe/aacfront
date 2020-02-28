import React from "react";
import { connect } from "react-redux";
import { newStep, zipcodeMember } from "../../redux/actions";
import {FormControl} from 'react-bootstrap';
import Searchbar from './Searchbar'


class Step8 extends React.Component {
  render() {
    if (this.props.currentStep !== 8) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return(
      <div  style={{marginTop: '100px'}} className="form-group">
        <div class="col-sm-6 col-sm-offset-3 center-form">
          <div className="col-sm-10 col-sm-offset-1">
            <h2 class="question-title text-center">
              Are you looking for members near you?
            </h2>
          </div>
          <div class="custom-buttons">
            <Searchbar />
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

export default connect(null, mapDispatchToProps)(Step8);
