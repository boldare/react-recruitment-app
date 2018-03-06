import { expect } from 'chai';
import flattenMessagesFunction from './flattenMessages';

const testJson = {
  app: {
    header: {
      links: {
        homepage: 'Homepage',
        'create-retro': 'Create new retrospective'
      }
    }
  }
};

describe('i18n/services/flattenMessages', () => {
  it('does flatten messages', () => {
    expect(flattenMessagesFunction(testJson)).to.deep.equal({
      'app.header.links.homepage': 'Homepage',
      'app.header.links.create-retro': 'Create new retrospective'
    });
  });
});
