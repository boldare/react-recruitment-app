import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { Button } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import { submitOnEnter } from '../../services/events/submitOnEnter';

export const NEW_NAME_FIELD = 'newName';

class ChangeNameDialog extends Component {
  onSetNameClick = () => {
    const { setName, [NEW_NAME_FIELD]: newName, closeDialog } = this.props;
    setName(this.context.socket, newName);
    closeDialog();
  }

  render() {
    const { closeDialog, open, canContinue } = this.props;

    return (
      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle>
          <FormattedMessage id="set-name.header" />
        </DialogTitle>
        <DialogContent>
          <Field
            name={NEW_NAME_FIELD}
            component={TextField}
            autoFocus
            margin="dense"
            label={<FormattedMessage id="set-name.name" />}
            onKeyPress={submitOnEnter(this.onSetNameClick)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            <FormattedMessage id="navigation.cancel" />
          </Button>
          <Button
            onClick={canContinue ? this.onSetNameClick : undefined}
            disabled={!canContinue}
            color="primary"
          >
            <FormattedMessage id="set-name.set-name" />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ChangeNameDialog.contextTypes = {
  socket: PropTypes.object.isRequired
};

ChangeNameDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  [NEW_NAME_FIELD]: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  canContinue: PropTypes.bool.isRequired
};

export default ChangeNameDialog;
