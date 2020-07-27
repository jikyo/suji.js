/* eslint-env mocha */
const assert = require('assert');
const Converter = require('../lib/converter');

describe('Converter', () => {
  describe('values', () => {
    it('should return an empty array', () => {
      assert.deepEqual(Converter.values(''), []);
      assert.deepEqual(Converter.values('こんにちは'), []);
      assert.deepEqual(Converter.values(true), []);
    });

    it('should return the corresponding int value', () => {
      let expect;
      expect = [
        { val: 5, beg: 0, end: 1 },
      ];
      assert.deepEqual(Converter.values('５'), expect);

      expect = [
        { val: 5, beg: 3, end: 4 },
      ];
      assert.deepEqual(Converter.values('これは5円です。'), expect);

      expect = [
        { val: 1000, beg: 3, end: 8 },
      ];
      assert.deepEqual(Converter.values('これは1,000円です。'), expect);

      expect = [
        { val: 2, beg: 2, end: 3 },
      ];
      assert.deepEqual(Converter.values('値は2'), expect);

      expect = [
        { val: 3000, beg: 2, end: 7 },
      ];
      assert.deepEqual(Converter.values('値は3,000'), expect);

      expect = [
        { val: 400, beg: 0, end: 4 },
      ];
      assert.deepEqual(Converter.values('400, 円になります。'), expect);

      expect = [
        { val: 1000, beg: 0, end: 6 },
        { val: 2000, beg: 7, end: 13 },
        { val: 3000, beg: 14, end: 20 },
      ];
      assert.deepEqual(Converter.values('1,000, 2,000, 3,000,'), expect);

      expect = [
        { val: 5, beg: 3, end: 4 },
        { val: 60, beg: 5, end: 7 },
        { val: 700, beg: 8, end: 11 },
      ];
      assert.deepEqual(Converter.values('数列、5、60、700、'), expect);
    });

    const stringify = (vals) => {
      let s = '[ ';
      vals.forEach((v) => {
        s += '{ ';
        s += 'val:';
        s += parseFloat(v.val).toPrecision(12).toString();
        s += ', beg:';
        s += v.beg;
        s += ', end:';
        s += v.end;
        s += ' } ';
      });
      s += ']';
      return s;
    };

    it('should return the corresponding decimal value', () => {
      let expect;
      expect = [
        { val: 0.6, beg: 0, end: 3 },
      ];
      assert.equal(stringify(Converter.values('0.6')), stringify(expect));

      expect = [
        { val: 0.0007, beg: 0, end: 6 },
      ];
      assert.deepEqual(stringify(Converter.values('0.0007')), stringify(expect));

      expect = [
        { val: 0.987654321, beg: 0, end: 11 },
      ];
      assert.deepEqual(stringify(Converter.values('0.987654321')), stringify(expect));

      expect = [
        { val: 1.3, beg: 0, end: 3 },
      ];
      assert.deepEqual(stringify(Converter.values('1.3')), stringify(expect));

      expect = [
        { val: 123.45, beg: 0, end: 6 },
      ];
      assert.deepEqual(stringify(Converter.values('123.45')), stringify(expect));

      expect = [
        { val: 1, beg: 0, end: 2 },
      ];
      assert.deepEqual(stringify(Converter.values('1.')), stringify(expect));

      expect = [
        { val: 1, beg: 3, end: 5 },
      ];
      assert.deepEqual(stringify(Converter.values('これは1.です。')), stringify(expect));

      expect = [
        { val: 0.325, beg: 0, end: 6 },
      ];
      assert.deepEqual(stringify(Converter.values('三割二分五厘')), stringify(expect));

      expect = [
        { val: 2.3, beg: 0, end: 3 },
        { val: 0.005, beg: 4, end: 6 },
      ];
      assert.deepEqual(stringify(Converter.values('三割二部五厘')), stringify(expect));

      expect = [
        { val: 0.123, beg: 2, end: 6 },
      ];
      assert.deepEqual(stringify(Converter.values('多分.123です。')), stringify(expect));

      expect = [
        { val: 0.00123, beg: 2, end: 8 },
      ];
      assert.deepEqual(stringify(Converter.values('多分.00123です。')), stringify(expect));
    });

    it('should return values from Kansuji string.', () => {
      let expect;
      expect = [
        { val: 250, beg: 0, end: 4 },
      ];
      assert.deepEqual(Converter.values('二百五十円'), expect);

      expect = [
        { val: 1007, beg: 0, end: 2 },
      ];
      assert.deepEqual(Converter.values('千七円'), expect);

      expect = [
        { val: 1000, beg: 0, end: 2 },
      ];
      assert.deepEqual(Converter.values('一千'), expect);

      expect = [
        { val: 10000000, beg: 0, end: 3 },
      ];
      assert.deepEqual(Converter.values('一千万円'), expect);

      expect = [
        { val: 11110000, beg: 0, end: 8 },
      ];
      assert.deepEqual(Converter.values('一千一百一十一万円'), expect);

      expect = [
        { val: 11110000, beg: 3, end: 11 },
      ];
      assert.deepEqual(Converter.values('価格は一千一百一十一万'), expect);

      expect = [
        { val: 11110000, beg: 3, end: 11 },
      ];
      assert.deepEqual(Converter.values('価格は一千一百一十一万円です。'), expect);

      expect = [
        { val: 11100000, beg: 0, end: 4 },
      ];
      assert.deepEqual(Converter.values('千百十万円'), expect);

      expect = [
        { val: 12130000, beg: 0, end: 6 },
      ];
      assert.deepEqual(Converter.values('千二百十三万円'), expect);

      expect = [
        { val: 91180000, beg: 0, end: 6 },
      ];
      assert.deepEqual(Converter.values('九千百十八万円'), expect);

      expect = [
        { val: 11101111, beg: 0, end: 8 },
      ];
      assert.deepEqual(Converter.values('千百十万千百十一円'), expect);

      expect = [
        { val: 120052, beg: 3, end: 9 },
      ];
      assert.deepEqual(Converter.values('価格は十二万五十二円になります。'), expect);

      expect = [
        { val: 12000000000052, beg: 3, end: 9 },
      ];
      assert.deepEqual(Converter.values('価格は十二兆五十二'), expect);

      expect = [
        { val: 1001000000000052, beg: 0, end: 6 },
      ];
      assert.deepEqual(Converter.values('千一兆五十二円になります。'), expect);

      expect = [
        { val: 604002005, beg: 0, end: 9 },
      ];
      assert.deepEqual(Converter.values('6億400万2千5になります。'), expect);

      expect = [
        { val: 11110, beg: 0, end: 4 },
      ];
      assert.deepEqual(Converter.values('万千百十'), expect);

      expect = [
        { val: 1, beg: 0, end: 1 },
        { val: 2000000305017, beg: 6, end: 15 },
      ];
      assert.deepEqual(Converter.values('１つの価格が二兆30万五千十7円になります。'), expect);
    });
  });

  describe('value', () => {
    it('should return an input string', () => {
      assert.deepEqual(Converter.value(''), '');
      assert.deepEqual(Converter.value('こんにちは'), 'こんにちは');
      assert.deepEqual(Converter.value(true), true);
    });

    it('should return the corresponding string from the input numeric string.', () => {
      assert.equal(Converter.value('二百五十円'), '250円');
      assert.equal(Converter.value('千七円'), '1007円');
      assert.equal(Converter.value('一千'), '1000');
      assert.equal(Converter.value('一千万円'), '10000000円');
      assert.equal(Converter.value('一千一百一十一万円'), '11110000円');
      assert.equal(Converter.value('3億'), '300000000');
      assert.equal(Converter.value('価格は一千一百一十一万'), '価格は11110000');
      assert.equal(Converter.value('価格は一千一百一十一万円です。'), '価格は11110000円です。');
      assert.equal(Converter.value('千百十万円'), '11100000円');
      assert.equal(Converter.value('千二百十三万円'), '12130000円');
      assert.equal(Converter.value('九千百十八万円'), '91180000円');
      assert.equal(Converter.value('千百十万千百十一円'), '11101111円');
      assert.equal(Converter.value('価格は十二万五十二円になります。'), '価格は120052円になります。');
      assert.equal(Converter.value('価格は十二兆五十二'), '価格は12000000000052');
      assert.equal(Converter.value('千一兆五十二円になります。'), '1001000000000052円になります。');
      assert.equal(Converter.value('6億400万2千5になります。'), '604002005になります。');
      assert.equal(Converter.value('万千百十'), '11110');
      assert.equal(Converter.value('１つの価格が二兆30万五千十7円になります。'), '1つの価格が2000000305017円になります。');
    });
  });
});
