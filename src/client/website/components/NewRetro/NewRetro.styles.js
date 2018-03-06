import { wideCardWidth } from '../../theme/dimensions';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2
  },
  button: {
    color: theme.palette.blue
  },
  headline: {
    color: theme.palette.darkGrey,
    fontSize: '21px',
    fontWeight: '700',
    paddingBottom: theme.spacing.unit * 2
  },
  listItem: {
    paddingLeft: '0',
    textAlign: 'left'
  },
  card: {
    width: '100%',
    maxWidth: wideCardWidth,
    margin: '0 auto',
    overflow: 'hidden',
    boxShadow: '0 9px 0 -2px rgba(0,0,0,0.05), 0 2px rgba(0,0,0,.1)',
    borderRadius: '4px'
  },
  row: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  horizontalMargins: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  newColumnContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center'
  },
  newColumnIconContainer: {
    flex: '0 0 128px'
  },
  newColumnIcon: {
    width: 16,
    height: 16
  },
  newColumnIconSelect: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  newColumnNameInput: {
    flex: '1'
  },
  cardContent: {
    padding: theme.spacing.unit * 2
  },
  progress: {
    display: 'absolute',
    margin: 'auto'
  },
  hidden: {
    opacity: '0',
    pointerEvents: 'none'
  },
  addColumnsInfo: {
    color: theme.palette.midGrey,
    marginTop: '30px'
  }
});

export default styles;
