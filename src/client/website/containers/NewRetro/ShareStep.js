import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../../components/NewRetro/NewRetro.styles';
import { RETRO_SHARE_ID_KEY } from '../../reducers/retro';
import ShareStep from '../../components/NewRetro/ShareStep';

const mapStateToProps = ({ retro },
  { match: { params: { retroShareId: retroShareParamId } } }) => ({
  retroShareId: retro[RETRO_SHARE_ID_KEY],
  retroShareParamId
});

const mapDispatchToProps = () => ({});

export default withRouter(withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(ShareStep)
));
