import React, { PureComponent } from 'react';
import { Input, Button } from 'material-ui';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


class RemainingVotes extends PureComponent {
  handleChange = ({ target }) => {
    const { value } = target;
    const { socket } = this.context;

    this.props.changeVoteLimit(socket, +value);
  }

  increaseVoteLimit = () => {
    const { socket } = this.context;
    const { changeVoteLimit, votes } = this.props;
    changeVoteLimit(socket, votes + 1);
  }

  decreaseVoteLimit = () => {
    const { socket } = this.context;
    const { changeVoteLimit, votes } = this.props;
    changeVoteLimit(socket, votes - 1);
  }

  render() {
    const { userSubmmitedVotes, votes, scrumMasterId, userId, classes } = this.props;
    const isScrumMaster = userId && scrumMasterId === userId;
    return (
      <div className={classes.remainingVotesContainer}>
        {isScrumMaster && [
          <Input key="input" className={classes.voteLimitInput} value={votes} onChange={this.handleChange} />,
          <div key="buttons">
            <Button
              key="increase"
              raised
              color="primary"
              size="small"
              className={classes.votesButton}
              onClick={this.increaseVoteLimit}
            >
              +
            </Button>,
            <Button
              key="decrease"
              raised
              color="primary"
              size="small"
              className={classes.votesButton}
              onClick={this.decreaseVoteLimit}
            >
              -
            </Button>
          </div>
        ]}
        <span className={classes.remainingVotes}>
          {<FormattedMessage id="retro.remaining-votes" />}: {votes - userSubmmitedVotes}
        </span>
      </div>
    );
  }
}
RemainingVotes.defaultProps = {
  votes: 0,
  userSubmmitedVotes: 0,
  scrumMasterId: '',
  userId: ''
};

RemainingVotes.propTypes = {
  changeVoteLimit: PropTypes.func.isRequired,
  scrumMasterId: PropTypes.string,
  userId: PropTypes.string,
  votes: PropTypes.number,
  userSubmmitedVotes: PropTypes.number,
  classes: PropTypes.shape({
    voteLimitInput: PropTypes.string.isRequired,
    remainingVotes: PropTypes.string.isRequired
  }).isRequired
};

RemainingVotes.contextTypes = {
  socket: PropTypes.object.isRequired
};


export default RemainingVotes;
