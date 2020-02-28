import React from 'react';
import { connect } from "react-redux";
import { updateOnlineStatus} from "../../redux/actions";
import Tooltip from '@material-ui/core/Tooltip';





export default class OnlineStatus extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      age: null
    }
  }

  render() {
    return (
      <div className='online-dot' >
        <div>
          <img
            style={{width: '14px', height:'14px', marginLeft: '10px'}}
            src={require('../../assets/icons8-online-48.png')}
          />
        </div>
      </div>
    );
  }
}

