import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';

const ConnectingDialog = ({
  classes,
  open
}) => (
  <Dialog open={open}>
    <DialogTitle>Connecting</DialogTitle>
    <DialogContent className={classes.dialogContent}>
      <CircularProgress />
    </DialogContent>
  </Dialog>
);

ConnectingDialog.propTypes = {
  classes: PropTypes.shape({
    dialogContent: PropTypes.string.isRequired
  }).isRequired,
  open: PropTypes.bool.isRequired
};

export default ConnectingDialog;
