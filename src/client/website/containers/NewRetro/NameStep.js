import React from 'react';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { formValueSelector, isValid, reduxForm } from 'redux-form';
import styles from '../../components/NewRetro/NewRetro.styles';
import NameStep from '../../components/NewRetro/NameStep';
import { retroCreate } from '../../actions/retro';
import { RETRO_NEW_QUERY_KEY, RETRO_SHARE_ID_KEY } from '../../reducers/retro';

const CREATE_RETRO_FORM = 'createRetro';

const formSelector = formValueSelector(CREATE_RETRO_FORM);
const formValid = isValid(CREATE_RETRO_FORM);

const mapStateToProps = ({ retro, ...state }) => ({
  retroShareId: retro[RETRO_SHARE_ID_KEY],
  newRetroQuery: retro[RETRO_NEW_QUERY_KEY],
  name: formSelector(state, 'name') || '',
  canCreateRetro: formValid(state)
});

const mapDispatchToProps = dispatch => ({
  createRetro: (socket, name) => dispatch(retroCreate(socket, name))
});

const validate = ({ name }) => {
  const errors = {};
  if (!name) errors.name = <FormattedMessage id="start-retro.name-required" />;
  return errors;
};

export default withRouter(withStyles(styles, { withTheme: true })(
  reduxForm({
    form: CREATE_RETRO_FORM,
    initialValues: {
      name: ''
    },
    validate
  })(
    connect(mapStateToProps, mapDispatchToProps)(NameStep)
  )
));
