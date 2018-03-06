import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './../../components/Retro/Steps.styles';
import Steps from '../../components/Retro/Steps';
import { changeStep } from '../../actions/steps';
import { RETRO_SCRUM_MASTER_ID_KEY, RETRO_STEP_KEY } from '../../reducers/retro';
import { USER_ID_KEY } from '../../reducers/user';

const mapStateToProps = ({ retro, user }) => ({
  userId: user[USER_ID_KEY],
  scrumMasterId: retro[RETRO_SCRUM_MASTER_ID_KEY],
  step: retro[RETRO_STEP_KEY]
});

const mapDispatchToProps = dispatch => ({
  changeStep: (socket, step) => dispatch(changeStep(socket, step))
});

export default withRouter(withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(Steps)
));
