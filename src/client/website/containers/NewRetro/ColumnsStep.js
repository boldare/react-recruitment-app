import React from 'react';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { formValueSelector, isValid, reduxForm } from 'redux-form';
import styles from '../../components/NewRetro/NewRetro.styles';
import {
  COLUMN_ADD_QUERY_KEY, COLUMN_REMOVE_QUERY_KEY, RETRO_COLUMNS_KEY, RETRO_JOIN_QUERY_KEY,
  RETRO_SHARE_ID_KEY
} from '../../reducers/retro';
import { columnAdd, columnRemove } from '../../actions/column';
import ColumnsStep from '../../components/NewRetro/ColumnsStep';
import { retroJoin } from '../../actions/retro';

const NEW_COLUMN_FORM = 'newForm';

const formSelector = formValueSelector(NEW_COLUMN_FORM);
const formValid = isValid(NEW_COLUMN_FORM);

const mapStateToProps = ({ retro, ...state },
  { match: { params: { retroShareId: retroShareParamId } } }) => ({
  columns: retro[RETRO_COLUMNS_KEY],
  retroShareId: retro[RETRO_SHARE_ID_KEY],
  joinRetroQuery: retro[RETRO_JOIN_QUERY_KEY],
  addColumnQuery: retro[COLUMN_ADD_QUERY_KEY],
  removeColumnQuery: retro[COLUMN_REMOVE_QUERY_KEY],
  ...formSelector(state, 'newColumnName', 'newColumnIcon'),
  canAddColumn: formValid(state),
  retroShareParamId
});

const mapDispatchToProps = {
  joinRetro: retroJoin,
  addColumn: columnAdd,
  removeColumn: columnRemove
};

const validate = (values) => {
  const errors = {};
  if (!values.newColumnName) {
    errors.newColumnName = <FormattedMessage id="columns.column-name-required" />;
  }
  return errors;
};

export default withRouter(withStyles(styles, { withTheme: true })(
  reduxForm({
    form: NEW_COLUMN_FORM,
    initialValues: {
      newColumnName: '',
      newColumnIcon: 'positive'
    },
    validate
  })(
    connect(mapStateToProps, mapDispatchToProps)(ColumnsStep)
  )
));
