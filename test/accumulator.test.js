/* eslint-env mocha */
const assert = require('assert');
const Acc = require('../lib/accumulator');

describe('accumulator', () => {
  describe('increment', () => {
    it('should not increment the inner state', () => {
      const acc = new Acc();
      acc.increment(5);
      assert.equal(acc.inside, false);
      assert.equal(acc.beg, undefined);
    });

    it('should increment the inner state', () => {
      const acc = new Acc();
      acc.attachNumber(0, 5);
      assert.equal(acc.inside, true);
      assert.equal(acc.beg, 0);
      assert.equal(acc.end, 1);
      acc.increment(10);
      assert.equal(acc.inside, true);
      assert.equal(acc.beg, 0);
      assert.equal(acc.end, 2);
    });
  });

  describe('turnDecimalState', () => {
    it('should increment the inner state and change the base', () => {
      const acc = new Acc();
      acc.attachNumber(0, 5);
      acc.turnDecimalState(1);
      assert.equal(acc.inside, true);
      assert.equal(acc.beg, 0);
      assert.equal(acc.end, 2);
      assert.equal(acc.base, 0.1);
    });
  });

  describe('attachCardinal', () => {
    it('should attach the value to the inner value 0', () => {
      const acc = new Acc();
      acc.attachNumber(0, 0);
      acc.attachCardinal(1, 100);
      assert.equal(acc.valCardinal, 100);
      assert.equal(acc.lastCardinal, 100);
    });

    it('should attach the value to the inner value non 0', () => {
      const acc = new Acc();
      acc.attachNumber(0, 5);
      acc.attachCardinal(1, 100);
      assert.equal(acc.valCardinal, 500);
      assert.equal(acc.lastCardinal, 100);
    });

    it('should attach the value less than lastCardinal', () => {
      const acc = new Acc();
      acc.attachNumber(0, 5);
      acc.attachCardinal(1, 100);
      acc.attachCardinal(2, 10);
      assert.equal(acc.valCardinal, 510);
      assert.equal(acc.lastCardinal, 10);
    });

    it('should attach 0 to 0', () => {
      const acc = new Acc();
      acc.attachNumber(0, 0);
      acc.attachCardinal(1, 100);
      acc.attachCardinal(2, 10);
      assert.equal(acc.valCardinal, 110);
    });
  });

  describe('attachNumber', () => {
    it('should attach tha value when the base is more than 1', () => {
      const acc = new Acc();
      acc.attachNumber(0, 2);
      acc.attachNumber(0, 3);
      assert.equal(acc.val, 23);
    });

    it('should attach tha value when the base is less than 1', () => {
      const acc = new Acc();
      acc.base = 0.1;
      acc.attachNumber(0, 2);
      acc.attachNumber(0, 3);
      assert.equal(acc.val, 0.23);
    });
  });
});
