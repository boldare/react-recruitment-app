import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Notification from './../../components/Notifications/Notification';
import styles from './../../components/Notifications/Notification.styles';
import { removeMessage } from '../../actions/layout';

const mapDispatchToProps = dispatch => ({
  removeMessage: id => dispatch(removeMessage(id))
});

export default withRouter(withStyles(styles)(
  connect(undefined, mapDispatchToProps)(Notification)
));
