import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import styles from './../../../components/App/Footer/Footer.styles';
import Footer from './../../../components/App/Footer/Footer';

export default withRouter(withStyles(styles)(Footer));
