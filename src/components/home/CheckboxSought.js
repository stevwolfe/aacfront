import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect } from "react-redux";
import { updateSought } from "../../redux/actions";


class CheckboxLabels extends React.Component {


  constructor(props) {
    super(props),
    this.state ={
                  exciting: false,
                  long: false,
                  anything: false,
                  short: false,
                  undecided: false,
                  virtual: false,
                }
    this.handleChange = this.handleChange.bind(this)
  }


  componentWillMount = () => {

    if (this.props.userDetails) {
      this.setState({exciting: this.props.userDetails.lookingExciting,
                    long: this.props.userDetails.lookingLong,
                    anything: this.props.userDetails.lookingAnything,
                    short: this.props.userDetails.lookingShort,
                    undecided: this.props.userDetails.lookingUndecided,
                    virtual: this.props.userDetails.lookingVirtual,
                  })
    }
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.userDetails) {
      this.setState({exciting: nextProps.userDetails.lookingExciting,
                    long: nextProps.userDetails.lookingLong,
                    anything: nextProps.userDetails.lookingAnything,
                    short: nextProps.userDetails.lookingShort,
                    undecided: nextProps.userDetails.lookingUndecided,
                    virtual: nextProps.userDetails.lookingVirtual,
       })
    }
  }

  handleChange = name => event => {
    const userId = this.props.currentUserId
    let value = this.state
    const stateValue = value[name]
    this.props.updateSought(userId,name,!stateValue)


  };

  render() {

    return (
      <div className="flex-box-infos" style={{marginLeft: 'calc(50% - 52px'}}>
        <FormControlLabel control={<Checkbox onChange={this.handleChange('exciting')} checked={this.state.exciting ? true : false} />} label="Anything exciting" />
        <FormControlLabel control={<Checkbox onChange={this.handleChange('long')} checked={this.state.long ? true  : false} />} label="Long term" />
        <FormControlLabel control={<Checkbox onChange={this.handleChange('anything')} checked={this.state.anything ? true  : false} />} label="Open to anything" />
        <FormControlLabel control={<Checkbox onChange={this.handleChange('short')} checked={this.state.short ? true  : false}/>} label="Short term" />
        <FormControlLabel control={<Checkbox onChange={this.handleChange('undecided')} checked={this.state.undecided ? true  : false} />} label="Undecided" />
        <FormControlLabel control={<Checkbox onChange={this.handleChange('virtual')} checked={this.state.virtual ? true : false} />} label="Virtual" />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    userDetails: state.userDetails
  }
};

const mapDispatchToProps = dispatch => ({
  updateSought: (userId,name,descr) => {
    dispatch(updateSought(userId,name,descr));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(CheckboxLabels);
