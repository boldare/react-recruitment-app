import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Snackbar } from 'material-ui';
import CloseIcon from 'material-ui-icons/Close';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  remove = (event, reason) => {
    if (reason === 'clickaway') return;
    const { removeMessage, id } = this.props;
    this.setState({ isOpen: false }, () => setTimeout(() => removeMessage(id), 500));
  };

  render() {
    const { id, message, classes } = this.props;
    const { isOpen } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className={classes.snackbar}
        open={isOpen}
        autoHideDuration={3000}
        onClose={this.remove}
        SnackbarContentProps={{
          'aria-describedby': `message-${id}`
        }}
        message={<span id={`message-${id}`}>{message}</span>}
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="accent"
            className={classes.close}
            onClick={this.remove}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}

Notification.propTypes = {
  // Variables
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  // Functions
  removeMessage: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    snackbar: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired
  }).isRequired
};

export default Notification;
