const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
    padding: theme.spacing.unit,
    margin: `${theme.spacing.unit / 2}px 0`,
    boxShadow: '0 9px 0 -2px rgba(0,0,0,0.05), 0 2px rgba(0,0,0,.1)',
    borderRadius: '4px'
  },
  cardActions: {
    height: 'auto'
  },
  expander: {
    flexGrow: 1
  },
  text: {
    paddingBottom: theme.spacing.unit,
    whiteSpace: 'pre-wrap'
  },
  author: {
    height: '22px',
    minHeight: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#aaa',
    margin: '0px',
    minWidth: '20px',
    padding: '0px 6px',
    background: '#eee'
  },
  action: {
    width: 24,
    height: 24
  },
  actionIcon: {
    width: 16,
    height: 16
  },
  doneIcon: {
    color: theme.palette.good
  },
  editIcon: {
    '&:hover': {
      color: theme.palette.greyBlue
    }
  }
});

export default styles;
