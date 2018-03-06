import theme from '../../theme';

const styles = () => ({
  '@global': {
    body: {
      color: theme.palette.darkGrey,
      padding: '0',
      margin: '0',
      lineHeight: '1.4em'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none'
    },
    '*': {
      boxSizing: 'border-box'
    },
    button: {
      border: '1px solid #000'
    }
  },
  flex: {
    flex: '1'
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    margin: '0',
    padding: '0',
    width: '100%',
    minHeight: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    textAlign: 'center',
    background: theme.palette.lightGray
  },
  content: {
    flex: '1 0 100%',
    display: 'flex',
    background: theme.palette.lightGrey
  }
});

export default styles;
