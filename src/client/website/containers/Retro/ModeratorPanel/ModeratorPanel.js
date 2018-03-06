import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import styles from './../../../components/Retro/ModeratorPanel/ModeratorPanel.styles';
import ModeratorPanel from './../../../components/Retro/ModeratorPanel';
import { USER_ID_KEY } from '../../../reducers/user';
import { RETRO_STEP_KEY, RETRO_SCRUM_MASTER_ID_KEY } from '../../../reducers/retro';
import { changeStep } from '../../../actions/steps';

const mapStateToProps = ({ user, retro }) => ({
  isScrumMaster: !!(retro.join.status === 'success' && user[USER_ID_KEY] && retro[RETRO_SCRUM_MASTER_ID_KEY] === user[USER_ID_KEY]),
  retroStep: retro[RETRO_STEP_KEY]
});

const mapDispatchToProps = dispatch => ({
  changeStep: (socket, step) => dispatch(changeStep(socket, step))
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ModeratorPanel)
);
