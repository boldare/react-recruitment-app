import { expect } from 'chai';
import {
  mainRoutes, headerRoutes, genericRoutesReducer
} from './routes';

/* eslint-disable no-unused-expressions */
describe('Routes', () => {
  it('main routes are array that is not empty', () => {
    expect(mainRoutes).to.be.an('array').that.is.not.empty;
  });
  it('header routes are array', () => {
    expect(headerRoutes).to.be.an('array');
  });
  it('genericRoutesReducer ', () => {
    expect(genericRoutesReducer('notExistKey')([1], {})).to.eql([1]);
  });
});
