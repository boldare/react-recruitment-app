import { expect } from 'chai';
import TestedComponent from './index';
import { MAIN_ROUTES_KEY, HEADER_ROUTES_KEY } from '../routesKeys';

/* eslint-disable no-unused-expressions */
describe(`${TestedComponent.name} component`, () => {
  it('includes main routes', () => {
    const routes = TestedComponent[MAIN_ROUTES_KEY];
    expect(routes).to.be.an('array').that.is.not.empty;
  });
  it('includes header routes', () => {
    const routes = TestedComponent[HEADER_ROUTES_KEY];
    expect(routes).to.be.an('array');
  });
});
