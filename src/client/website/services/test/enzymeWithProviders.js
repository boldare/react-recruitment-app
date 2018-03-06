/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import messages from '../../i18n/messages';
import muiTheme from '../../theme';

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({
  locale: 'en', messages: messages.en, key: 'en'
}, {});
const { intl } = intlProvider.getChildContext();
const providerContext = {
  intl, muiTheme
};
const providerShapes = {
  intl: intlShape, muiTheme: PropTypes.object
};

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithProviders(node, { context } = {}) {
  const nodeWithIntl = nodeWithIntlProp(node);

  return shallow(nodeWithIntl, {
    context: { ...providerContext, ...context }
  });
}

export function mountWithProviders(node, { context, childContextTypes } = {}) {
  const nodeWithIntl = nodeWithIntlProp(node);

  return mount(nodeWithIntl, {
    context: { ...providerContext, ...context },
    childContextTypes: { ...providerShapes, ...childContextTypes }
  });
}

export default {
  mount: mountWithProviders,
  shallow: shallowWithProviders
};
