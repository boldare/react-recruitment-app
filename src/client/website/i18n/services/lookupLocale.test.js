import { expect } from 'chai';
import lookupLocaleFunc from './lookupLocale';

describe('i18n/services/lookupLocale', () => {
  it('navigator.language test', () => {
    expect(lookupLocaleFunc('pl')).to.equal('pl');
  });
  it('navigator.languages test', () => {
    expect(lookupLocaleFunc(null, 'pl')).to.equal('pl');
  });
  it('navigator.userLanguage test', () => {
    expect(lookupLocaleFunc(null, null, 'pl')).to.equal('pl');
  });
  it('default language test', () => {
    expect(lookupLocaleFunc(null, null, null)).to.equal('en-US');
  });
});
