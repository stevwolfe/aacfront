import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { connect } from "react-redux";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AlertDialogSlide extends React.Component {

  state = {
            open: false
          }

  componentWillUpdate = (prevProps) => {
    if (prevProps.openModalAlert != this.props.openModalAlert) {
      this.setState({open: prevProps.openModalAlert })
    }
  }

  handleClose = () => {
    this.setState({open: false})
      window.location.href = "/search";
  }

  render = () => {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
             You have successfully blocked this member ! You won't be able to find each others anymore.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    openModalAlert: state.openModalAlert
  }
};

export default connect(mapStateToProps, null )(AlertDialogSlide);
