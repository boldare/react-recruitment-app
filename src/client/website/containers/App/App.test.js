import React from 'react';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import TestedComponent, { AppContainer } from './index';
import enzyme from '../../services/test/enzymeWithProviders';
import { USER_CONNECTED_KEY } from '../../reducers/user';
import { LAYOUT_CHANGE_NAME_DIALOG_OPEN_KEY } from '../../reducers/layout';

const mockStore = configureMockStore();
const mockedStore = {
  layout: {
    [LAYOUT_CHANGE_NAME_DIALOG_OPEN_KEY]: false
  },
  user: {
    [USER_CONNECTED_KEY]: false
  }
};
const mockProps = {
  changeLanguage: () => {
  },
  navbarToggleHandler: () => {
  },
  isChangeNameDialogOpen: false,
  isConnected: false,
  classes: {
    app: 'app'
  }
};

describe(`${TestedComponent.name} container`, () => {
  it('renders without crashing', () => {
    enzyme.shallow(<TestedComponent store={mockStore(mockedStore)} />);
  });
  it('renders AppContainer with MainContent', () => {
    const wrapper = enzyme.shallow(
      <AppContainer
        {...mockProps}
        store={mockStore(mockedStore)}
      />
    );

    expect(wrapper.find('App')).to.have.length(1);
    expect(wrapper.find('MainContent')).to.have.length(1);
  });
});
