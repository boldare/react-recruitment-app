import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Close from 'material-ui-icons/Close';
import { withStyles } from 'material-ui/styles/index';
import styles from './Votes.styles';

const Votes = ({ classes, userVotesNr, totalVotesNr,
  addUserVote, removeUserVote, disabled }) => {
  const userVoteCircles = [];
  for (let i = 0; i < userVotesNr; i++) {
    userVoteCircles.push(<div key={`user-vote-circle-${i}`} className={classes.userVoteCircle} />);
  }
  return (
    <div className={classes.votingMainContainer}>
      {userVotesNr > 0 &&
      <IconButton className={classes.action} onClick={removeUserVote}>
        <Close className={classes.actionIcon} />
      </IconButton>
      }
      {userVoteCircles}
      <IconButton className={classes.action} onClick={addUserVote} disabled={disabled}>
        <ThumbUp className={classes.actionIcon} />
      </IconButton>
      <div>{totalVotesNr}</div>
    </div>
  );
};
Votes.defaultProps = {
  disabled: false
};

Votes.propTypes = {
  classes: PropTypes.shape({
    votingMainContainer: PropTypes.string.isRequired,
    userVoteCircle: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    actionIcon: PropTypes.string.isRequired
  }).isRequired,
  disabled: PropTypes.bool,
  totalVotesNr: PropTypes.number.isRequired,
  userVotesNr: PropTypes.number.isRequired,
  addUserVote: PropTypes.func.isRequired,
  removeUserVote: PropTypes.func.isRequired
};

export default withStyles(styles)(Votes);
