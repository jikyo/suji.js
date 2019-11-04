/* eslint-env mocha */
const assert = require('assert');
const Kansuji = require('../lib/kansuji');

describe('Kansuji', () => {
  describe('value', () => {
    it('should return the corresponding kansuji string', () => {
      assert.equal(Kansuji.value(30), '三十');
      assert.equal(Kansuji.value(56), '五十六');
      assert.equal(Kansuji.value(100, false), '百');
      assert.equal(Kansuji.value(100, true), '一百');
      assert.equal(Kansuji.value(111, false), '百十一');
      assert.equal(Kansuji.value(1004), '一千四');
      assert.equal(Kansuji.value(1004, false), '千四');
      assert.equal(Kansuji.value(10005), '一万五');
      assert.equal(Kansuji.value(10005, false), '万五');
      assert.equal(Kansuji.value(20000005), '二千万五');
      assert.equal(Kansuji.value(10000000), '一千万');
      assert.equal(Kansuji.value(10000000, false), '千万');
      assert.equal(Kansuji.value(20010300), '二千一万三百');
      assert.equal(Kansuji.value(2000000607), '二十億六百七');
      assert.equal(Kansuji.value(32.001), '三十二');
    });

    it('should return the corresponding minus kansuji string', () => {
      assert.equal(Kansuji.value(-20010300), 'マイナス二千一万三百');
      assert.equal(Kansuji.value(-0), '零');
      assert.equal(Kansuji.value(-1), 'マイナス一');
      assert.equal(Kansuji.value(-100000000, true), 'マイナス一億');
    });

    it('should ignore the value after the decimal point', () => {
      assert.equal(Kansuji.value(-1.1), 'マイナス一');
      assert.equal(Kansuji.value(-100.234, false), 'マイナス百');
    });
  });

  describe('kansujis', () => {
    it('should return an empty array', () => {
      assert.deepEqual(Kansuji.kansujis(''), []);
      assert.deepEqual(Kansuji.kansujis('こんにちは'), []);
      assert.deepEqual(Kansuji.kansujis(0.9), []);
      assert.deepEqual(Kansuji.kansujis({}, true), []);
      assert.deepEqual(Kansuji.kansujis([], false), []);
    });

    it('should return the coresspoing Kansuji objects', () => {
      let expect;
      expect = [
        { val: '零', beg: 0, end: 1 },
      ];
      assert.deepEqual(Kansuji.kansujis('0'), expect);

      expect = [
        { val: '一', beg: 0, end: 1 },
      ];
      assert.deepEqual(Kansuji.kansujis('1'), expect);

      expect = [
        { val: '十', beg: 0, end: 2 },
      ];
      assert.deepEqual(Kansuji.kansujis('10', false), expect);

      expect = [
        { val: '一十', beg: 0, end: 2 },
      ];
      assert.deepEqual(Kansuji.kansujis('10', true), expect);

      expect = [
        { val: '九十九万九千九百九十九', beg: 0, end: 6 },
      ];
      assert.deepEqual(Kansuji.kansujis('999999'), expect);

      expect = [
        { val: '九十九万九千一百', beg: 0, end: 6 },
      ];
      assert.deepEqual(Kansuji.kansujis('999100'), expect);

      expect = [
        { val: '九十九万九千百', beg: 0, end: 6 },
      ];
      assert.deepEqual(Kansuji.kansujis('999100', false), expect);

      expect = [
        { val: '一千万', beg: 0, end: 6 },
      ];
      assert.deepEqual(Kansuji.kansujis('1,000万'), expect);

      expect = [
        { val: '千万', beg: 0, end: 6 },
      ];
      assert.deepEqual(Kansuji.kansujis('1,000万', false), expect);

      expect = [
        { val: '一千万五十六', beg: 4, end: 14 },
      ];
      assert.deepEqual(Kansuji.kansujis('価格は￥10,000,056です。'), expect);

      expect = [
        { val: '千万五十六', beg: 4, end: 14 },
      ];
      assert.deepEqual(Kansuji.kansujis('価格は￥10,000,056です。', false), expect);

      expect = [
        { val: '一', beg: 0, end: 1 },
        { val: '二兆三十万五千十七', beg: 6, end: 15 },
      ];
      assert.deepEqual(Kansuji.kansujis('１つの価格が二兆30万五千十7円になります。', false), expect);

      expect = [
        { val: '一', beg: 0, end: 1 },
        { val: '二兆三十万五千一十七', beg: 6, end: 15 },
      ];
      assert.deepEqual(Kansuji.kansujis('１つの価格が二兆30万五千十7円になります。'), expect);
    });
  });

  describe('kansuji', () => {
    it('should return an input object', () => {
      assert.equal(Kansuji.kansuji(''), '');
      assert.equal(Kansuji.kansuji('こんにちは'), 'こんにちは');
      assert.equal(Kansuji.kansuji(0.9), 0.9);
      assert.deepEqual(Kansuji.kansuji({}, true), {});
      assert.deepEqual(Kansuji.kansuji([], false), []);
    });

    it('should return the coresspoing Kansuji string', () => {
      assert.equal(Kansuji.kansuji('0'), '零');
      assert.equal(Kansuji.kansuji('それは0'), 'それは零');
      assert.equal(Kansuji.kansuji('0は零'), '零は零');
      assert.equal(Kansuji.kansuji('1'), '一');
      assert.equal(Kansuji.kansuji('10'), '一十');
      assert.equal(Kansuji.kansuji('10', false), '十');
      assert.equal(Kansuji.kansuji('11', false), '十一');
      assert.equal(Kansuji.kansuji('11'), '一十一');
      assert.equal(Kansuji.kansuji('これは999999です。'), 'これは九十九万九千九百九十九です。');
      assert.equal(Kansuji.kansuji('これは999100です。'), 'これは九十九万九千一百です。');
      assert.equal(Kansuji.kansuji('これは999100です。', false), 'これは九十九万九千百です。');
      assert.equal(Kansuji.kansuji('価格は￥10,000,056です。'), '価格は￥一千万五十六です。');
      assert.equal(Kansuji.kansuji('価格は￥10,000,056です。', false), '価格は￥千万五十六です。');
      assert.equal(Kansuji.kansuji('１つの価格が二兆30万五千十7円になります。'), '一つの価格が二兆三十万五千一十七円になります。');
      assert.equal(Kansuji.kansuji('１つの価格が二兆30万五千十7円になります。', false), '一つの価格が二兆三十万五千十七円になります。');
    });
  });
});
