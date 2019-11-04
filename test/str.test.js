/* eslint-env mocha */
const assert = require('assert');
const isStr = require('../lib/str');

describe('str', () => {
  describe('isStr', () => {
    it('should return a corresponding boolean value for the input', () => {
      assert.equal(isStr(''), true);
      assert.equal(isStr('abc'), true);
      assert.equal(isStr('こんにちは'), true);
      assert.equal(isStr([]), false);
      assert.equal(isStr({}), false);
      assert.equal(isStr(() => {}), false);
    });
  });
});
