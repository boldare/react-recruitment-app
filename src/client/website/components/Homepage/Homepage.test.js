import React from 'react';
import { expect } from 'chai';
import { BrowserRouter } from 'react-router-dom';
import TestedComponent from './../../containers/Homepage';
import enzymeIntl from '../../services/test/enzymeWithProviders';

const propsMock = {
  history: {
    push: () => {
    }
  },
  location: {
    pathname: '123'
  },
  classes: {
    root: 'root',
    card: 'card',
    buttons: 'buttons',
    button: 'button',
    bigLogo: 'bigLogo'
  }
};

describe(`${TestedComponent.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzymeIntl.mount(
      <BrowserRouter><TestedComponent {...propsMock} /></BrowserRouter>,
    );

    expect(wrapper.find('div.root')).to.have.length(1);
  });
});
