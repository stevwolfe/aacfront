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


class CheckboxSexual extends React.Component {


  constructor(props) {
    super(props),
    this.state ={
                  anythingGoes: false,
                  beingDominated: false,
                  dominating: false,
                  normal: false,
                  threesome: false,
                  secret: false,
                  beingBlind: false,
                  costume: false,
                  rolePlaying: false,
                  usingSexToys: false,
                  unusualPlaces: false,
                  beingWatched: false,
                  willingExperiment: false
                }
    this.handleChange = this.handleChange.bind(this)
  }


  componentWillMount = () => {

    if (this.props.userDetails) {
      this.setState({anythingGoes: this.props.userDetails.anythingGoes,
                    beingDominated: this.props.userDetails.beingDominated,
                    dominating: this.props.userDetails.dominating,
                    normal: this.props.userDetails.normal,
                    threesome: this.props.userDetails.threesome,
                    secret: this.props.userDetails.secret,
                    beingBlind: this.props.userDetails.beingBlind,
                    costume: this.props.userDetails.costume,
                    rolePlaying: this.props.userDetails.rolePlaying,
                    usingSexToys: this.props.userDetails.usingSexToys,
                    unusualPlaces: this.props.userDetails.unusualPlaces,
                    beingWatched: this.props.userDetails.beingWatched,
                    willingExperiment: this.props.userDetails.willingExperiment,
                  })
    }
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.userDetails != this.props.userDetails) {
            console.log('hey im also here')
      this.setState({anythingGoes: nextProps.userDetails.anythingGoes,
                    beingDominated: nextProps.userDetails.beingDominated,
                    dominating: nextProps.userDetails.dominating,
                    normal: nextProps.userDetails.normal,
                    threesome: nextProps.userDetails.threesome,
                    secret: nextProps.userDetails.secret,
                    beingBlind: nextProps.userDetails.beingBlind,
                    costume: nextProps.userDetails.costume,
                    rolePlaying: nextProps.userDetails.rolePlaying,
                    usingSexToys: nextProps.userDetails.usingSexToys,
                    unusualPlaces: nextProps.userDetails.unusualPlaces,
                    beingWatched: nextProps.userDetails.beingWatched,
                    willingExperiment: nextProps.userDetails.willingExperiment,
       })
    }
  }

  handleChange = name => event => {
    const userId = this.props.currentUserId
    let value = this.state
    const stateValue = value[name]
    this.props.updateSexual(userId,name,!stateValue)



  };

  render() {

    return (
      <div>
        <div className='title-box-infos' style={{display: 'flex', justifyContent: 'center', marginBottom: '25px'}}>
          <img src={require('../../assets/butch.png')} />
          <h4>SEXUAL PRACTICES</h4>
        </div>
        <div className="boxes-infos-horizontal">
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('anythingGoes')} checked={this.state.anythingGoes ? true : false} />} label="Anything goes" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('beingDominated')} checked={this.state.beingDominated ? true  : false} />} label="Being dominated" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('dominating')} checked={this.state.dominating ? true  : false} />} label="Dominating" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('normal')} checked={this.state.normal ? true  : false}/>} label="Normal" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('threesome')} checked={this.state.threesome ? true  : false} />} label="Threesome" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('secret')} checked={this.state.secret ? true : false} />} label="Secret" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('beingBlind')} checked={this.state.beingBlind ? true : false} />} label="Being blinded folded" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('costume')} checked={this.state.costume ? true  : false} />} label="costume" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('rolePlaying')} checked={this.state.rolePlaying ? true  : false} />} label="Role playing" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('usingSexToys')} checked={this.state.usingSexToys ? true  : false}/>} label="Using sex toys" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('unusualPlaces')} checked={this.state.unusualPlaces ? true  : false} />} label="Sex in unusual places" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('beingWatched')} checked={this.state.beingWatched ? true : false} />} label="Being watched" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('willingExperiment')} checked={this.state.willingExperiment ? true : false} />} label="Willing to experiment" />
        </div>
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
  updateSexual: (name,userId, description) => {
    dispatch(updateSought(name,userId, description));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(CheckboxSexual);
