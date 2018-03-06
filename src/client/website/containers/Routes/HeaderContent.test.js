import React from 'react';
import { expect } from 'chai';
import { BrowserRouter } from 'react-router-dom';
import TestedComponent from './HeaderContent';
import enzymeIntl from '../../services/test/enzymeWithProviders';

describe(`${TestedComponent.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzymeIntl
      .mount(<BrowserRouter><TestedComponent /></BrowserRouter>);

    expect(wrapper.find('NotFound')).to.have.length(0);
  });
});
