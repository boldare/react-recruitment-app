const styles = theme => ({
  votingMainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  action: {
    width: 24,
    height: 24
  },
  actionIcon: {
    width: 16,
    height: 16
  },
  userVoteCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#616161',
    borderRadius: 5,
    margin: theme.spacing.unit / 4
  }
});

export default styles;
