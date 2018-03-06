import React from 'react';
import { expect } from 'chai';
import TestedComponent from './index';
import enzyme from '../../services/test/enzymeWithProviders';

describe(`${TestedComponent.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzyme.shallow(<TestedComponent />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('h1')).to.have.length(1);
  });
});
