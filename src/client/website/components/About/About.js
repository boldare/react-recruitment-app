import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { FormattedMessage } from 'react-intl';

const About = () => (
  <div>
    <Paper className="root" elevation={4}>
      <Typography type="headline" component="h1">
        Retromeet
      </Typography>
      <Typography type="body1" component="p">
        <FormattedMessage id="about.description" />
      </Typography>
    </Paper>
  </div>
);

export default About;
