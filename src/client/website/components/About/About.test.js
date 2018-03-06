import React from 'react';
import { expect } from 'chai';
import TestedComponent from './index';
import enzymeIntl from '../../services/test/enzymeWithProviders';

describe(`${TestedComponent.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzymeIntl.shallow(<TestedComponent />);

    expect(wrapper.find('div')).to.have.length(1);
  });
});
