import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import styles from './../../components/JoinRetro/JoinRetro.styles';
import JoinRetro from '../../components/JoinRetro/JoinRetro';
import { RETRO_JOIN_QUERY_KEY } from '../../reducers/retro';
import { retroJoin } from '../../actions/retro';

const formSelector = formValueSelector('joinRetro');

const mapStateToProps = state => ({
  joinRetroQuery: state.retro[RETRO_JOIN_QUERY_KEY],
  retroId: formSelector(state, 'retroId')
});

const mapDispatchToProps = dispatch => ({
  joinRetro: (socket, retroId) => dispatch(retroJoin(socket, retroId))
});

export default withRouter(withStyles(styles, { withTheme: true })(reduxForm({
  form: 'joinRetro',
  initialValues: { retroId: '' }
})(
  connect(mapStateToProps, mapDispatchToProps)(JoinRetro)
)));
