import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Button, Card, Typography } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { CardContent } from '../../../../../node_modules/material-ui/Card/index';
import { retroRoutePath } from '../../routes/Retro/MainRoutes';

const JoinRetro = ({ classes, theme, history, retroId }) => (
  <div className={classes.root}>
    <Card className={classes.card}>
      <Typography type="headline" className={classes.headline}>
        <FormattedMessage id="join-retro.header" />
      </Typography>
      <CardContent>
        <Typography>
          <FormattedMessage id="join-retro.description" />
        </Typography>
        <Field
          name="retroId"
          component={TextField}
          autoFocus
          margin="dense"
          helperText={<FormattedMessage id="join-retro.enter-identifier" />}
          label={<FormattedMessage id="retro.id" />}
          maxLength="16"
          fullWidth
        />
      </CardContent>
      <Button
        dense
        onClick={() => history.push(retroRoutePath(retroId))}
        disabled={retroId.length !== 16}
      >
        <FormattedMessage id="join-retro.join" />
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </Button>
    </Card>
  </div>
);

JoinRetro.propTypes = {
  history: PropTypes.object.isRequired,
  retroId: PropTypes.string.isRequired,
  // Styles
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object.isRequired
};

export default JoinRetro;
