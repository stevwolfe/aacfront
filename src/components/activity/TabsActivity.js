import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import UpdateIcon from '@material-ui/icons/Update';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { resetNotificationsVisitorTab, resetNotificationsSmileyTab } from "../../redux/actions";
import { connect } from "react-redux";
import VisitorCard from './VisitorCard'
import SmileyCard from './SmileyCard'
import FavoriteCard from './FavoriteCard'
import {formatDate, formatHours} from '../../functions.js'
import '../../assets/activity.css'


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: "115px",
  },
}));


function TabsActivity(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className="col-sm-8 col-sm-offset-2">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >

            <Tab label="Favorites" icon={<FavoriteIcon />} inkBarStyle={{background: 'red'}}/>
            <Tab label={
              <Badge className="notifs-tabs" color="secondary" badgeContent={props.visitorNotification} >
                VISITORS
              </Badge>
              }
              onClick={props.resetNotificationsVisitor}
              icon={<PersonPinIcon />} />
            <Tab label={
              <Badge className="notifs-tabs" color="secondary" badgeContent={props.smileyNotification} >
                SMILEYS
              </Badge>
              }
              onClick={props.resetNotificationsSmiley}
              icon={<SentimentSatisfied />}
            />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <TabContainer>
            {
              props.favoritesList.reverse().map(favorite => {
                  return (<FavoriteCard
                    id={favorite.user.id}
                    urlPhoto={favorite.user.photo}
                    username= {favorite.user.username}
                    date= {formatDate(favorite.created_at)}
                    hours={formatHours(favorite.created_at)}
                  />)
              })
            }
          </TabContainer>}
        {value === 1 &&
          <TabContainer>
            {
              props.visitorsList.reverse().map(visitor => {
                if (visitor.user.photo) {
                  return (<VisitorCard
                    id={visitor.user.id}
                    urlPhoto={visitor.user.photo}
                    username= {visitor.user.username}
                    date= {formatDate(visitor.created_at)}
                    hours={formatHours(visitor.created_at)}
                  />)}
              })
            }
          </TabContainer>}
        {value === 2 &&
          <TabContainer>
            {
              props.smilersList.reverse().map(smiler => {
                if (smiler.user.photo) {
                  return (<SmileyCard
                    id={smiler.user.id}
                    urlPhoto={smiler.user.photo}
                    username= {smiler.user.username}
                    date= {formatDate(smiler.created_at)}
                    hours={formatHours(smiler.created_at)}
                  />)}
              })
            }
          </TabContainer>}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    favoritesList: state.favoritesList,
    visitorsList: state.visitorsList,
    smilersList: state.smilersList,
    visitorNotification: state.visitorNotificationCounter,
    smileyNotification: state.smileyNotificationCounter,
  }
};

const mapDispatchToProps = dispatch => ({
  resetNotificationsVisitor: () => {
    dispatch(resetNotificationsVisitorTab())
  },
  resetNotificationsSmiley: () => {
    dispatch(resetNotificationsSmileyTab())
  }
})


export default connect(mapStateToProps,mapDispatchToProps)(TabsActivity);

