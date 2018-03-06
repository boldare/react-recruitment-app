import { connect } from 'react-redux';
import { LAYOUT_MESSAGES_KEY } from '../../reducers/layout';
import Notifications from '../../components/Notifications/Notifications';

const mapStateToProps = ({ layout }) => ({
  messages: layout[LAYOUT_MESSAGES_KEY]
});

export default connect(mapStateToProps)(Notifications);
