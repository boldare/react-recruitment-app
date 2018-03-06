import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { withMobileDialog } from 'material-ui/Dialog';
import ConnectingDialog from '../../components/ConnectingDialog';
import styles from '../../components/ConnectingDialog/ConnectingDialog.styles';
import { USER_CONNECTED_KEY } from '../../reducers/user';

const mapStateToProps = state => ({
  open: !state.user[USER_CONNECTED_KEY]
});

export default withStyles(styles)(
  withMobileDialog({ breakpoint: 'xs' })(
    connect(mapStateToProps)(ConnectingDialog)
  )
);
