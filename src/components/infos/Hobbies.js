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


class CheckboxHobbies extends React.Component {


  constructor(props) {
    super(props),
    this.state ={
                  arts: false,
                  cooking: false,
                  hiking: false,
                  networking: false,
                  videoGames: false,
                  book: false,
                  diningOut: false,
                  movies: false,
                  nightclubs: false,
                  museums: false,
                  charities: false,
                  shopping: false,
                  wine: false,
                  coffee: false,
                  gardening: false,
                  pets: false,
                  music: false,
                  religion: false
                }
    this.handleChange = this.handleChange.bind(this)
  }


  componentWillMount = () => {

    if (this.props.userDetails) {
      this.setState({arts: this.props.userDetails.arts,
                    cooking: this.props.userDetails.cooking,
                    hiking: this.props.userDetails.hiking,
                    networking: this.props.userDetails.networking,
                    videoGames: this.props.userDetails.videoGames,
                    book: this.props.userDetails.book,
                    diningOut: this.props.userDetails.diningOut,
                    movies: this.props.userDetails.movies,
                    nightclubs: this.props.userDetails.nightclubs,
                    charities: this.props.userDetails.charities,
                    museums: this.props.userDetails.museums,
                    shopping: this.props.userDetails.shopping,
                    wine: this.props.userDetails.wine,
                    coffee: this.props.userDetails.coffee,
                    gardening: this.props.userDetails.gardening,
                    pets: this.props.userDetails.pets,
                    music: this.props.userDetails.music,
                    religion: this.props.userDetails.religion,
                  })
    }
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.userDetails != this.props.userDetails) {
            console.log('hey im also here')
      this.setState({arts: nextProps.userDetails.arts,
                    cooking: nextProps.userDetails.cooking,
                    hiking: nextProps.userDetails.hiking,
                    networking: nextProps.userDetails.networking,
                    videoGames: nextProps.userDetails.videoGames,
                    book: nextProps.userDetails.book,
                    diningOut: nextProps.userDetails.diningOut,
                    movies: nextProps.userDetails.movies,
                    nightclubs: nextProps.userDetails.nightclubs,
                    charities: nextProps.userDetails.charities,
                    museums: nextProps.userDetails.museums,
                    shopping: nextProps.userDetails.shopping,
                    wine: nextProps.userDetails.wine,
                    coffee: nextProps.userDetails.coffee,
                    gardening: nextProps.userDetails.gardening,
                    pets: nextProps.userDetails.pets,
                    music: nextProps.userDetails.music,
                    religion: nextProps.userDetails.religion,
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
          <img src={require('../../assets/hobbies.png')} />
          <h4>HOBBIES</h4>
        </div>
        <div className="boxes-infos-horizontal">
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('arts')} checked={this.state.arts ? true : false} />} label="Arts" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('cooking')} checked={this.state.cooking ? true  : false} />} label="Cooking" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('hiking')} checked={this.state.hiking ? true  : false} />} label="Hiking" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('networking')} checked={this.state.networking ? true  : false}/>} label="Networking" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('videoGames')} checked={this.state.videoGames ? true  : false} />} label="Video games" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('book')} checked={this.state.book ? true : false} />} label="Book" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('diningOut')} checked={this.state.diningOut ? true : false} />} label="Dining out" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('movies')} checked={this.state.movies ? true  : false} />} label="Movies" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('nightclubs')} checked={this.state.nightclubs ? true  : false} />} label="Nightclubs" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('religion')} checked={this.state.religion ? true  : false}/>} label="Religion" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('charities')} checked={this.state.charities ? true  : false} />} label="Charities" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('museums')} checked={this.state.museums ? true : false} />} label="Museums" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('shopping')} checked={this.state.shopping ? true : false} />} label="Shopping" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('wine')} checked={this.state.wine ? true  : false} />} label="Wine" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('coffee')} checked={this.state.coffee ? true  : false} />} label="Coffee" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('gardening')} checked={this.state.gardening ? true  : false}/>} label="Gardening" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('pets')} checked={this.state.pets ? true  : false} />} label="Pets" />
          <FormControlLabel style={{flex: '1 0 14%'}} control={<Checkbox onChange={this.handleChange('music')} checked={this.state.music ? true : false} />} label="Music" />
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


export default connect(mapStateToProps,mapDispatchToProps )(CheckboxHobbies);
