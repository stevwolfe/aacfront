import React from 'react';
import HeightInfo from '../home/HeightInfo'
import HairInfo from '../home/HairInfo'
import EyeInfo from '../home/EyeInfo'
import SmokerInfo from '../home/SmokerInfo'
import { fetchCurrentUser } from "../../redux/actions";
import { connect } from "react-redux";


class PhysicalInfo extends React.Component   {
  state = {
    eyeColor: "",
    hairColor: "",
    height: "",
    smoker: ""
  };

  componentWillReceiveProps= (nextProps)  => {

    const userDetails = nextProps.userDetails
    this.setState({
                    eyeColor: userDetails.eyeColor,
                    hairColor: userDetails.hairColor,
                    height: userDetails.height,
                    smoker: userDetails.smoker,
                  })
  }

  render = () =>
    (
      <div className="flex-infos-center">
        <div>
          <div className='title-box-infos'>
            <img src={require('../../assets/human-body.png')} />
            <h4>PHYSICAL INFORMATIONS</h4>
          </div>
          <div  className="flex-box-infos"  style={{marginLeft: 'calc(50% - 52px)',alignItems: 'baseline'}}>
            <HeightInfo height={this.state.height} />
            <HairInfo hairColor={this.state.hairColor} />
            <EyeInfo eyeColor={this.state.eyeColor}/>
            <SmokerInfo smoker={this.state.smoker} />
          </div>
        </div>
      </div>
    )
}


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    userDetails: state.userDetails
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser())
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(PhysicalInfo);

