
const styles = theme => ({
  appBarContainer: {
    marginTop: 64
  },
  leftDiv: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center'
  },
  appBar: {
    width: '100%',
    backgroundColor: theme.palette.darkBlue,
    position: 'fixed',
    zIndex: 100,
    bottom: 0,
    left: 0
  },
  actionButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'flex-end',
    color: '#6f7a88',
    marginBottom: theme.spacing.unit
  },
  button: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  }
});

export default styles;
