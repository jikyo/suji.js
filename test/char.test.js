/* eslint-env mocha */
const assert = require('assert');
const char = require('../lib/char');

describe('char', () => {
  describe('isDelimiter', () => {
    it('should return true', () => {
      assert.equal(char.isDelimiter(','), true);
    });

    it('should return false', () => {
      assert.equal(char.isDelimiter('あ'), false);
      assert.equal(char.isDelimiter('あああ'), false);
      assert.equal(char.isDelimiter('.'), false);
      assert.equal(char.isDelimiter(',,'), false);
    });
  });

  describe('isDecimal', () => {
    it('should return true', () => {
      assert.equal(char.isDecimal('.'), true);
    });

    it('should return false', () => {
      assert.equal(char.isDecimal('い'), false);
      assert.equal(char.isDecimal(','), false);
      assert.equal(char.isDecimal('..'), false);
    });
  });

  describe('number', () => {
    it('should return the corresponding number', () => {
      assert.equal(char.number('2'), 2);
      assert.equal(char.number('五'), 5);
      assert.equal(char.number('Ⅺ'), 11);
    });

    it('should return undefined', () => {
      assert.equal(char.number('n'), undefined);
      assert.equal(char.number('ナ'), undefined);
      assert.equal(char.number('名'), undefined);
    });
  });

  describe('cardinal', () => {
    it('should return the corresponding number', () => {
      assert.equal(char.cardinal('百'), 100);
      assert.equal(char.cardinal('京'), 10000000000000000);
    });

    it('should return undefined', () => {
      assert.equal(char.cardinal('e'), undefined);
      assert.equal(char.cardinal('エ'), undefined);
      assert.equal(char.cardinal('絵'), undefined);
    });
  });
});
