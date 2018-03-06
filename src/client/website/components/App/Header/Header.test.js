import React from 'react';
import { expect } from 'chai';
import Header from './Header';
import enzymeIntl from '../../../services/test/enzymeWithProviders';

const mockProps = {
  classes: {
    appBar: 'appBar',
    actionButtons: 'actionButtons',
    appLogo: 'appLogo'
  },
  openChangeNameDialog: () => {
  }
};

describe(`${Header.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzymeIntl.shallow(
      <Header {...mockProps} isOpen>
        <div className="test">Test</div>
      </Header>);

    expect(wrapper.find('img'), 'img').to.have.length(1);
    expect(wrapper.find('div.test'), 'div.test').to.have.length(1);
  });
});
