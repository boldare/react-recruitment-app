
const styles = theme => ({
  appBar: {
    width: '100%',
    backgroundColor: theme.palette.darkBlue,
    position: 'relative'
  },
  Toolbar: {
    color: '#fff',
    fontFamily: 'arial',
    fontWeight: 700,
    letterSpacing: 0.5
  },
  actionButtons: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    color: '#6f7a88'
  },
  headline: {
    color: '#1ba8ed',
    fontSize: '16px',
    padding: `0 ${2 * theme.spacing.unit}px`
  },
  logoIcon: {
    verticalAlign: 'middle',
    marginRight: '6px',
    color: '#fff'
  },
  logotype: {
    verticalAlign: 'middle'
  },
  icon: {
    color: theme.palette.greyBlue,
    width: '90px'
  },
  userName: {
    fontSize: 'small',
    marginLeft: '8px'
  }
});

export default styles;
