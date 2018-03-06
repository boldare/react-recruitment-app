const styles = theme => ({
  remainingVotesContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  voteLimitInput: {
    color: '#eee',
    width: 20,
    textAlign: 'center'
  },
  remainingVotes: {
    color: '#eee',
    fontSize: '16px',
    whiteSpace: 'nowrap'
  },
  votesButton: {
    marginRight: theme.spacing.unit,
    minWidth: '0px',
    width: '20%',
    maxWidth: '88px'
  }
});

export default styles;
