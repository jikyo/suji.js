const Converter = require('./converter');
const isStr = require('./str');

module.exports = (() => {
  const zero = '零';

  const minus = 'マイナス';

  const number = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
  };

  const radic = [
    10000000000000000,
    1000000000000,
    100000000,
    10000,
    1000,
    100,
    10,
  ];

  const radicKanji = [
    '京',
    '兆',
    '億',
    '万',
    '千',
    '百',
    '十',
  ];

  // const __before_the_decimal_point = '割';

  /*
  const __radic_adp = [
    0.1,
    0.01,
    0.001,
  ];

  const __radic_adp_kanji = [
    '分',
    '厘',
    '毛',
  ];
  */

  const value = (v, index, one) => {
    if (v === 0) {
      return '';
    }
    if (v < 0) {
      return `${minus}${value(-1 * v, index, one)}`;
    }
    if (v in number) {
      return number[v];
    }

    const div = Math.floor(v / radic[index]);
    if (div === 0) {
      return value(v, index + 1, one);
    }

    let prefix = '';
    if (div !== 1) {
      prefix = value(div, index + 1, one);
    } else if (one) {
      prefix = number['1'];
    }

    const mod = v % radic[index];
    return `${prefix}${radicKanji[index]}${value(mod, index + 1, one)}`;
  };

  const Kansuji = function Kansuji() {};

  Kansuji.prototype.value = (v, one = true) => {
    const i = parseInt(v, 10);
    return (i === 0)
      ? zero
      : value(i, 0, one);
  };

  Kansuji.prototype.kansujis = (src, one = true) => {
    if (!isStr(src)) {
      return [];
    }

    const vals = Converter.values(src);
    return vals.map((v) => {
      /* eslint arrow-body-style: 0 */
      return {
        beg: v.beg,
        end: v.end,
        val: Kansuji.prototype.value(v.val, one),
      };
    });
  };

  Kansuji.prototype.kansuji = (src, one = true) => {
    if (!isStr(src)) {
      return src;
    }

    const vals = Converter.values(src);
    if (vals.length === 0) {
      return src;
    }
    let start = 0;
    let s = '';
    vals.forEach((val) => {
      s += src.slice(start, val.beg);
      s += Kansuji.prototype.value(val.val, one);
      start = val.end;
    });
    s += src.slice(start, src.length);

    return s;
  };

  return new Kansuji();
})();
