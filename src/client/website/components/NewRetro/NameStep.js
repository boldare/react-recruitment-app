import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';
import { Button, CircularProgress, Typography } from 'material-ui';
import { CardContent } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';
import BaseStep from './BaseStep';
import {
  QUERY_ERROR_KEY, QUERY_STATUS_FAILURE, QUERY_STATUS_IN_PROGRESS, QUERY_STATUS_KEY, QueryShape,
  querySucceeded
} from '../../services/websocket/query';
import { submitOnEnter } from '../../services/events/submitOnEnter';
import { newRetroColumnsRoutePath } from '../../routes/NewRetro/MainRoutes';

class NameStep extends Component {
  componentWillReceiveProps(nextProps) {
    const { newRetroQuery: nextNewRetroQuery, retroShareId } = nextProps;
    const { newRetroQuery, history } = this.props;
    if (querySucceeded(newRetroQuery, nextNewRetroQuery)) {
      history.push(newRetroColumnsRoutePath(retroShareId));
    }
  }

  newRetro = () => {
    const { createRetro, name } = this.props;
    if (!name) return;
    createRetro(this.context.socket, name);
  };

  render() {
    const { classes, newRetroQuery, canCreateRetro } = this.props;

    const inProgress = newRetroQuery[QUERY_STATUS_KEY] === QUERY_STATUS_IN_PROGRESS;
    const error = newRetroQuery[QUERY_STATUS_KEY] === QUERY_STATUS_FAILURE
      && newRetroQuery[QUERY_ERROR_KEY];
    const beforeSubmit = !inProgress && !error;

    return (
      <BaseStep
        step={0}
        maxSteps={3}
        onNext={!inProgress && canCreateRetro ? this.newRetro : undefined}
        {...this.props}
      >
        {error && (
          <CardContent className={classes.cardContent}>
            <Typography>{error}</Typography>
            <Button onClick={this.newRetro}>Retry</Button>
          </CardContent>
        )}
        {inProgress && (
          <CardContent className={classes.cardContent}>
            <CircularProgress color="primary" />
          </CardContent>
        )}
        {beforeSubmit && (
          <CardContent className={classes.cardContent}>
            <Typography align="left" type="headline" className={classes.headline}>
              <FormattedMessage id="start-retro.header" />
            </Typography>
            <Typography align="left">
              <FormattedMessage id="start-retro.description" />
            </Typography>
            <Field
              name="name"
              component={TextField}
              autoFocus
              margin="dense"
              label={<FormattedMessage id="start-retro.name" />}
              fullWidth
              onKeyPress={submitOnEnter(this.newRetro)}
            />
          </CardContent>
        )}
      </BaseStep>
    );
  }
}

NameStep.defaultProps = {
  retroShareId: undefined
};

NameStep.contextTypes = {
  socket: PropTypes.object
};

NameStep.propTypes = {
  // Variables
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  retroShareId: PropTypes.string,
  canCreateRetro: PropTypes.bool.isRequired,
  // Functions
  createRetro: PropTypes.func.isRequired,
  // Queries
  newRetroQuery: PropTypes.shape(QueryShape).isRequired,
  // Styles
  classes: PropTypes.shape({
    cardContent: PropTypes.string.isRequired
  }).isRequired
};

export default NameStep;
