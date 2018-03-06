import React from 'react';
import PropTypes from 'prop-types';
import Notification from '../../containers/Notifications/Notification';

const Notifications = ({ messages }) => messages.map(notification => (
  <Notification
    key={notification.id}
    id={notification.id}
    message={notification.message}
  />
));

Notifications.propTypes = {
  // Variables
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
  })).isRequired
};

export default Notifications;
