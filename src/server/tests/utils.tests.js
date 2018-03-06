import { assert } from 'chai';
import { hexToUrlSafeBase64 } from '../utils';

describe('Utilities', () => {
  it('should correctly convert hex to url-safe base64', () => {
    let base64 = hexToUrlSafeBase64('6b72676865696a68676965756867');
    assert.equal(base64, 'a3JnaGVpamhnaWV1aGc_');
    base64 = hexToUrlSafeBase64('923936ff7d');
    assert.equal(base64, 'kjk2-30_');
  });
});
