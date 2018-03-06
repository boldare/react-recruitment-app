import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles/index';
import RemainingVotes from '../../components/RemainingVotes';
import {
  RETRO_VOTE_LIMIT_KEY,
  RETRO_SCRUM_MASTER_ID_KEY
} from '../../reducers/retro';
import {
  USER_ID_KEY
} from '../../reducers/user';
import { retroEdit } from '../../actions/retro';
import { getUserSubmittedVotes } from '../../selectors/votes';
import styles from '../../components/RemainingVotes/RemainingVotes.styles';

const mapStateToProps = ({ retro, user }) => ({
  votes: retro[RETRO_VOTE_LIMIT_KEY],
  scrumMasterId: retro[RETRO_SCRUM_MASTER_ID_KEY],
  userId: user[USER_ID_KEY],
  userSubmmitedVotes: getUserSubmittedVotes({ retro, user })
});

const mapDispatchToProps = dispatch => ({
  changeVoteLimit: (socket, voteLimit) => dispatch(retroEdit(socket, { voteLimit }))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RemainingVotes));
