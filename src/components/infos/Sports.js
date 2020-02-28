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


class CheckboxSport extends React.Component {


  constructor(props) {
    super(props),
    this.state ={
                  aerobics: false,
                  golf: false,
                  martialArts: false,
                  soccer: false,
                  walking: false,
                  rugby: false,
                  swimming: false,
                  baseball: false,
                  cycling: false,
                  running: false,
                  tennis: false,
                  weight: false,
                  basketball: false,
                  dance: false,
                  skiing: false,
                  volleyball: false,
                  hockey: false
                }
    this.handleChange = this.handleChange.bind(this)
  }


  componentWillMount = () => {

    if (this.props.userDetails) {
      this.setState({aerobics: this.props.userDetails.aerobics,
                    golf: this.props.userDetails.golf,
                    martialArts: this.props.userDetails.martialArts,
                    soccer: this.props.userDetails.soccer,
                    walking: this.props.userDetails.walking,
                    bowling: this.props.userDetails.bowling,
                    rugby: this.props.userDetails.rugby,
                    swimming: this.props.userDetails.swimming,
                    baseball: this.props.userDetails.baseball,
                    cycling: this.props.userDetails.cycling,
                    running: this.props.userDetails.running,
                    tennis: this.props.userDetails.tennis,
                    weight: this.props.userDetails.weight,
                    basketball: this.props.userDetails.basketball,
                    dance: this.props.userDetails.dance,
                    skiing: this.props.userDetails.skiing,
                    volleyball: this.props.userDetails.volleyball,
                    hockey: this.props.userDetails.hockey,
                  })
    }
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.userDetails != this.props.userDetails) {
            console.log('hey im also here')
      this.setState({aerobics: nextProps.userDetails.aerobics,
                    golf: nextProps.userDetails.golf,
                    martialArts: nextProps.userDetails.martialArts,
                    soccer: nextProps.userDetails.soccer,
                    walking: nextProps.userDetails.walking,
                    bowling: nextProps.userDetails.bowling,
                    rugby: nextProps.userDetails.rugby,
                    swimming: nextProps.userDetails.swimming,
                    baseball: nextProps.userDetails.baseball,
                    cycling: nextProps.userDetails.cycling,
                    running: nextProps.userDetails.running,
                    tennis: nextProps.userDetails.tennis,
                    weight: nextProps.userDetails.weight,
                    basketball: nextProps.userDetails.basketball,
                    dance: nextProps.userDetails.dance,
                    skiing: nextProps.userDetails.skiing,
                    volleyball: nextProps.userDetails.volleyball,
                    hockey: nextProps.userDetails.hockey,
       })
    }
  }

  handleChange = name => event => {
    const userId = this.props.currentUserId
    let value = this.state
    const stateValue = value[name]
    this.props.updateSport(userId,name,!stateValue)



  };

  render() {

    return (
      <div>
        <div className='title-box-infos' style={{display: 'flex', justifyContent: 'center', marginBottom: '25px'}}>
          <img src={require('../../assets/sports.png')} />
          <h4>SPORTS</h4>
        </div>
        <div className="boxes-infos-horizontal">
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('aerobics')} checked={this.state.aerobics ? true : false} />} label="Aerobics" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('golf')} checked={this.state.golf ? true  : false} />} label="Golf" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('martialArts')} checked={this.state.martialArts ? true  : false} />} label="Martial arts" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('soccer')} checked={this.state.soccer ? true  : false}/>} label="Soccer" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('walking')} checked={this.state.walking ? true  : false} />} label="Walking" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('bowling')} checked={this.state.bowling ? true : false} />} label="Bowling" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('hockey')} checked={this.state.hockey ? true : false} />} label="Hockey" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('rugby')} checked={this.state.rugby ? true  : false} />} label="Rugby" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('swimming')} checked={this.state.swimming ? true  : false} />} label="Swimming" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('baseball')} checked={this.state.baseball ? true  : false}/>} label="Baseball" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('cycling')} checked={this.state.cycling ? true  : false} />} label="Cycling" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('running')} checked={this.state.running ? true : false} />} label="Running" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('tennis')} checked={this.state.tennis ? true : false} />} label="Tennis" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('weight')} checked={this.state.weight ? true  : false} />} label="Weight" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('basketball')} checked={this.state.basketball ? true  : false} />} label="Basketball" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('dance')} checked={this.state.dance ? true  : false}/>} label="Dance" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('skiing')} checked={this.state.skiing ? true  : false} />} label="Skiing" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('volleyball')} checked={this.state.volleyball ? true : false} />} label="Volleyball" />
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
  updateSport: (name,userId, description) => {
    dispatch(updateSought(name,userId, description));
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(CheckboxSport);
