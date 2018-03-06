import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import styles from './../../../components/App/Header/Header.styles';
import Header from './../../../components/App/Header';
import { openChangeNameDialog } from '../../../actions/layout';
import { USER_NAME_KEY } from '../../../reducers/user';
import { RETRO_NAME_KEY, RETRO_ID_KEY } from '../../../reducers/retro';
import { retroLeave } from '../../../actions/retro';

const mapStateToProps = ({ user, retro }) => ({
  userName: user[USER_NAME_KEY],
  retroId: retro[RETRO_ID_KEY],
  headline: retro[RETRO_NAME_KEY]
});

const mapDispatchToProps = dispatch => ({
  openChangeNameDialog: () => dispatch(openChangeNameDialog(true)),
  leaveRetro: (socket, retroId) => dispatch(retroLeave(socket, retroId))
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
