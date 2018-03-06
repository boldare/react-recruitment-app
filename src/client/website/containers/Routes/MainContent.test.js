import React from 'react';
import { expect } from 'chai';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import TestedComponent from './MainContent';
import enzymeIntl from '../../services/test/enzymeWithProviders';

describe(`${TestedComponent.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzymeIntl
      .mount(<BrowserRouter><TestedComponent /></BrowserRouter>);

    expect(wrapper.find('Route')).to.have.lengthOf.above(0);
  });
  it('renders NotFound page', () => {
    const wrapper = enzymeIntl
      .mount(
        <MemoryRouter initialEntries={['/route/that/do/not/exist']}>
          <TestedComponent />
        </MemoryRouter>,
      );

    expect(wrapper.find('NotFound')).to.have.length(1);
  });
});
