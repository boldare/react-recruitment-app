import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CardContent } from 'material-ui/Card';
import { Button, TextField, Typography } from 'material-ui';
import BaseStep from './BaseStep';
import { newRetroColumnsRoutePath } from '../../routes/NewRetro/MainRoutes';
import { retroRoutePath } from '../../routes/Retro/MainRoutes';

class ShareStep extends Component {
  copyToClipobard = () => {
    this.textFieldRef.select();
    document.execCommand('copy');
  };

  render() {
    const { retroShareParamId, classes, history } = this.props;

    return (
      <BaseStep
        step={2}
        maxSteps={3}
        onBack={() => history.push(newRetroColumnsRoutePath(retroShareParamId))}
        onNext={() => history.push(retroRoutePath(retroShareParamId))}
        nextLabel={<FormattedMessage id="navigation.done" />}
        {...this.props}
      >
        <CardContent className={classes.cardContent}>
          <Typography type="headline" className={classes.headline}>
            <FormattedMessage id="share.header" />
          </Typography>
          <div className={classes.row}>
            <TextField
              fullWidth
              className={classes.horizontalMargins}
              value={`${window.location.origin}${retroRoutePath(retroShareParamId)}`}
              inputRef={(ref) => {
                this.textFieldRef = ref;
              }}
            />
            <Button
              raised
              className={classes.horizontalMargins}
              onClick={this.copyToClipobard}
            >
              <FormattedMessage id="navigation.copy" />
            </Button>
          </div>
        </CardContent>
      </BaseStep>
    );
  }
}

ShareStep.propTypes = {
  // Route Params
  retroShareParamId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  // Styles
  classes: PropTypes.shape({
    row: PropTypes.string.isRequired,
    cardContent: PropTypes.string.isRequired
  }).isRequired
};

export default ShareStep;
