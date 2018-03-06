import { createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';
import { good, darkBlue, bad, midGrey, lightGrey, darkGrey, greyBlue } from './colors';

export default createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
    greyBlue,
    darkBlue,
    midGrey,
    darkGrey,
    lightGrey,
    bad,
    good
  }
});
