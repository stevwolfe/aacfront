import React from "react";
import { connect } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';


class MessagesListHeader extends React.Component {


	render() {
		return (
			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '5px'}}>
				<p> <strong> Remaining messages:</strong> <strong style={{color: 'red'}}>{this.props.remainingMessages} </strong> </p>
			    <Tooltip title="Non-members are limited to 15 messages per day" placement="bottom">
			        <img
			          style={{width: '18px', height:'18px', marginLeft: '5px'}}
			          src={require('../../assets/question-mark.png')}
			          onClick={this.props.updateOnlineStatus}
			        />
			    </Tooltip>
		    </div>
		)
	}
}


const mapStateToProps = state => ({
  remainingMessages: state.currentUser.remainingMessages,
});


export default connect(mapStateToProps , null)(MessagesListHeader);


