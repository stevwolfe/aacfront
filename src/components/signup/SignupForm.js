import React from "react";
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import Step8 from './Step8'
import Step9 from './Step9'
import FinalStep from './FinalStep'

import NavbarSignup from './NavbarSignup'
import '../../assets/signup.css'
import { connect } from "react-redux";
import { fetchCurrentUser } from "../../redux/actions";


class Signup extends React.Component {
  constructor(props) {
    super(props)
    // Set the initial input values
    this.state = {
      currentStep: 1, // Default is Step 1
      email: '',
      username: '',
      password: '',
    }
    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this)
    this._next = this._next.bind(this)

  }

  // Use the submitted data to set the state
  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  _next() {
    let currentStep = this.state.currentStep
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  componentWillUpdate = (prevProps) => {
    if (this.props.newStep != prevProps.newStep) {
      this.setState({currentStep: prevProps.newStep})
    }
  }
  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault()
    const { email, username, password } = this.state
    // alert(`Your registration detail: \n
    //   Email: ${email} \n
    //   Username: ${username} \n
    //   Password: ${password}`)
  }
  render() {
    return (
      <div className="container-signup">
        <NavbarSignup />
        <div>
          <form onSubmit={this.handleSubmit}>
            <Step1
              currentStep={this.state.currentStep}
            />
            <Step2
              currentStep={this.state.currentStep}
            />
            <Step3
              currentStep={this.state.currentStep}
            />
            <Step4
              currentStep={this.state.currentStep}
            />
            <Step5
              currentStep={this.state.currentStep}
            />
            <Step6
              currentStep={this.state.currentStep}
            />
            <Step7
              currentStep={this.state.currentStep}
            />
            <Step8
              currentStep={this.state.currentStep}
            />
            <FinalStep
              currentStep={this.state.currentStep}
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newStep: state.newStep
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

