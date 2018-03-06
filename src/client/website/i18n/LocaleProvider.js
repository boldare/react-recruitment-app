import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import messages from './messages';
import configureIntl from './services/configureIntl';

configureIntl();

const LocaleProvider = ({ locale, children }) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
);

LocaleProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

const mapStateToProps = ({ layout: { locale } }) => ({
  locale
});

export default connect(mapStateToProps)(LocaleProvider);
