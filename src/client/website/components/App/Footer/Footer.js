import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';
import { FormattedMessage } from 'react-intl';

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <Typography type="caption">
      <FormattedMessage
        id="app.footer"
        values={{
          copyright: <a href="https://xsolve.software/">&copy; XSolve 2017</a>
        }}
      />
    </Typography>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.shape({
    footer: PropTypes.string.isRequired
  }).isRequired
};

export default Footer;
