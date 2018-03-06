import { assert } from 'chai';

export async function assertError(promise, message) {
  try {
    await promise;
    assert.fail(undefined, new Error(message));
  } catch (error) {
    assert.equal(error.message, message);
  }
}

export default {};
