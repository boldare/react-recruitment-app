import React from 'react';
import PropTypes from 'prop-types';
import NewReleases from 'material-ui-icons/NewReleases';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import Feedback from 'material-ui-icons/Feedback';

export const ColumnIcons = [
  'positive', 'negative', 'action', 'remark'
];

const Icon = ({ type, ...rest }) => {
  switch (type) {
    case 'positive':
      return <ThumbUp {...rest} />;
    case 'negative':
      return <ThumbDown {...rest} />;
    case 'action':
      return <NewReleases {...rest} />;
    case 'remark':
      return <Feedback {...rest} />;
    default:
      return null;
  }
};

Icon.propTypes = {
  type: PropTypes.string.isRequired
};

const ColumnIcon = ({ type, ...rest }) => (
  <Icon type={type} color="primary" {...rest} />
);


ColumnIcon.propTypes = {
  type: PropTypes.oneOf(['positive', 'negative', 'action', 'remark']).isRequired
};

export default ColumnIcon;
