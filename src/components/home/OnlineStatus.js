import React from 'react';
import { connect } from "react-redux";
import { updateOnlineStatus} from "../../redux/actions";
import Tooltip from '@material-ui/core/Tooltip';





class OnlineStatus extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      age: null
    }
  }



  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
        {this.props.onlineStatus?
          <div>
            <Tooltip title="APPEARING ONLINE" placement="bottom">
              <img
                style={{width: '28px', height:'28px', marginLeft: '10px'}}
                src={require('../../assets/icons8-online-48.png')}
                onClick={this.props.updateOnlineStatus}
              />
            </Tooltip>
          </div>:
          <Tooltip title="APPEARING OFFLINE" placement="bottom">
            <img
              style={{width: '28px', height:'28px', marginLeft: '10px'}}
              src={require('../../assets/icons8-offline-64.png')}
              onClick={this.props.updateOnlineStatus}
            />
          </Tooltip>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    onlineStatus: state.currentUser.onlineStatus,
  }
};

const mapDispatchToProps = dispatch => ({
  updateOnlineStatus: () => {
    dispatch(updateOnlineStatus());
  },
})


export default connect(mapStateToProps,mapDispatchToProps )(OnlineStatus);
