import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from "react-redux";
import { updateSought } from "../../redux/actions";


class CheckboxSexual extends React.Component {


  constructor(props) {
    super(props),
    this.state ={
                  active: false,
                  shy: false,
                  fun: false,
                  generous: false,
                  spiritual: false,
                  sociable: false,
                  moody: false,
                  relaxed: false,
                  sensitive: false,
                  modest: false,
                  cultivated: false,
                  imaginative: false,
                  independent: false,
                  mature: false,
                  outgoing: false,
                  selfConfident: false,
                  reliable: false,
                  sophisticated: false,
                }
    this.handleChange = this.handleChange.bind(this)
  }


  componentWillMount = () => {

    if (this.props.userDetails) {
      this.setState({active: this.props.userDetails.active,
                    shy: this.props.userDetails.shy,
                    sociable: this.props.userDetails.sociable,
                    fun: this.props.userDetails.fun,
                    generous: this.props.userDetails.generous,
                    spiritual: this.props.userDetails.spiritual,
                    moody: this.props.userDetails.moody,
                    relaxed: this.props.userDetails.relaxed,
                    sensitive: this.props.userDetails.sensitive,
                    modest: this.props.userDetails.modest,
                    cultivated: this.props.userDetails.cultivated,
                    imaginative: this.props.userDetails.imaginative,
                    independent: this.props.userDetails.independent,
                    mature: this.props.userDetails.mature,
                    outgoing: this.props.userDetails.outgoing,
                    selfConfident: this.props.userDetails.selfConfident,
                    reliable: this.props.userDetails.reliable,
                    sophisticated: this.props.userDetails.sophisticated,
                  })
    }
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.userDetails != this.props.userDetails) {
      this.setState({active: nextProps.userDetails.active,
                    shy: nextProps.userDetails.shy,
                    sociable: nextProps.userDetails.sociable,
                    fun: nextProps.userDetails.fun,
                    generous: nextProps.userDetails.generous,
                    spiritual: nextProps.userDetails.spiritual,
                    moody: nextProps.userDetails.moody,
                    relaxed: nextProps.userDetails.relaxed,
                    sensitive: nextProps.userDetails.sensitive,
                    modest: nextProps.userDetails.modest,
                    cultivated: nextProps.userDetails.cultivated,
                    imaginative: nextProps.userDetails.imaginative,
                    independent: nextProps.userDetails.independent,
                    mature: nextProps.userDetails.mature,
                    outgoing: nextProps.userDetails.outgoing,
                    selfConfident: nextProps.userDetails.selfConfident,
                    reliable: nextProps.userDetails.reliable,
                    sophisticated: nextProps.userDetails.sophisticated,
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
          <img src={require('../../assets/job-seeker.png')} />
          <h4>PERSONALITY</h4>
        </div>
        <div className="boxes-infos-horizontal">
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('active')} checked={this.state.active ? true : false} />} label="Active" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('shy')} checked={this.state.shy ? true  : false} />} label="Shy" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('sociable')} checked={this.state.sociable ? true  : false} />} label="Sociable" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('fun')} checked={this.state.fun ? true  : false}/>} label="Fun" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('generous')} checked={this.state.generous ? true  : false} />} label="Generous" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('spiritual')} checked={this.state.spiritual ? true : false} />} label="Spiritual" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('moody')} checked={this.state.moody ? true : false} />} label="Moody" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('relaxed')} checked={this.state.relaxed ? true : false} />} label="Relaxed" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('modest')} checked={this.state.modest ? true : false} />} label="Modest" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('sensitive')} checked={this.state.sensitive ? true : false} />} label="Sensitive" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('cultivated')} checked={this.state.cultivated ? true  : false} />} label="Cultivated" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('imaginative')} checked={this.state.imaginative ? true  : false}/>} label="Imaginative" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('independent')} checked={this.state.independent ? true  : false} />} label="Independent" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('mature')} checked={this.state.mature ? true : false} />} label="Mature" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('outgoing')} checked={this.state.outgoing ? true : false} />} label="Outgoing" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('selfConfident')} checked={this.state.selfConfident ? true : false} />} label="Self confident" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('reliable')} checked={this.state.reliable ? true : false} />} label="Reliable" />
          <FormControlLabel style={{flex: '1 0 14%'}}  control={<Checkbox onChange={this.handleChange('sophisticated')} checked={this.state.sophisticated ? true : false} />} label="Sophisticated" />
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
