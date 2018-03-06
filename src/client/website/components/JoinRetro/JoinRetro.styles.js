import { wideCardWidth } from '../../theme/dimensions';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headline: {
    color: theme.palette.darkGrey,
    fontSize: '21px',
    fontWeight: '700',
    paddingBottom: theme.spacing.unit * 2
  },
  card: {
    padding: theme.spacing.unit,
    width: '100%',
    maxWidth: wideCardWidth,
    margin: '0 auto',
    overflow: 'hidden',
    boxShadow: '0 9px 0 -2px rgba(0,0,0,0.05), 0 2px rgba(0,0,0,.1)',
    borderRadius: '4px'
  }
});

export default styles;
