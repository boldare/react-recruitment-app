import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import styles from './../../components/Homepage/Homepage.styles';
import Homepage from './../../components/Homepage/Homepage';

export default withRouter(withStyles(styles)(Homepage));
