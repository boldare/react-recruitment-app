import { withStyles } from 'material-ui/styles';
import { withMobileDialog } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import styles from './../../components/LanguageButton/LanguageButton.styles';
import LanguageButton from '../../components/LanguageButton';
import { setLocale } from '../../actions/layout';

const mapStateToProps = ({ layout: { locale } }) => ({
  locale
});

const mapDispatchToProps = {
  setLocale
};

export default withStyles(styles)(
  withMobileDialog({ breakpoint: 'xs' })(
    connect(mapStateToProps, mapDispatchToProps)(LanguageButton)
  )
);
