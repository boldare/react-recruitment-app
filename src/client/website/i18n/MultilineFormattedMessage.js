import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const MultilineFormattedMessage = ({ values, ...params }) => (
  <FormattedMessage
    {...params}
    values={{
      ...values,
      nl: <br />
    }}
  />
);
MultilineFormattedMessage.defaultProps = {
  values: {}
};

MultilineFormattedMessage.propTypes = {
  values: PropTypes.object
};

export default MultilineFormattedMessage;
