import { assert } from 'chai';
import messages from './index';

describe('Messages i18n', () => {
  it('contain polish and english translations', () => {
    assert.containsAllKeys(messages, ['en', 'pl', 'pl_PL', 'pl-PL']);
  });
});
