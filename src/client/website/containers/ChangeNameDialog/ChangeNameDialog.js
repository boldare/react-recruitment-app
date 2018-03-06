import { withMobileDialog } from 'material-ui/Dialog';
import { formValueSelector, isValid, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { connect } from 'react-redux';
import ChangeNameDialog from '../../components/ChangeNameDialog';
import { openChangeNameDialog } from '../../actions/layout';
import { userSetName } from '../../actions/user';
import { USER_NAME_KEY } from '../../reducers/user';
import { LAYOUT_CHANGE_NAME_DIALOG_OPEN_KEY } from '../../reducers/layout';
import { NEW_NAME_FIELD } from '../../components/ChangeNameDialog/ChangeNameDialog';

const NAME_FORM = 'name';

const formSelector = formValueSelector(NAME_FORM);
const formValid = isValid(NAME_FORM);

const mapStateToProps = state => ({
  newName: formSelector(state, NEW_NAME_FIELD) || '',
  canContinue: formValid(state),
  initialValues: {
    newName: state.user[USER_NAME_KEY] || ''
  },
  open: state.layout[LAYOUT_CHANGE_NAME_DIALOG_OPEN_KEY]
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(openChangeNameDialog(false)),
  setName: (socket, name) => dispatch(userSetName(socket, name))
});


const validate = (values) => {
  const errors = {};
  const newName = values[NEW_NAME_FIELD];
  if (!newName.trim().length) {
    errors[NEW_NAME_FIELD] = <FormattedMessage id="set-name.name-not-empty" />;
  }
  return errors;
};

export default withMobileDialog({ breakpoint: 'xs' })(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: NAME_FORM,
      enableReinitialize: true,
      fields: [NEW_NAME_FIELD],
      validate
    })(ChangeNameDialog)
  )
);
