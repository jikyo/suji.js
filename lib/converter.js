const Acc = require('./accumulator');
const Char = require('./char');
const isStr = require('./str');

module.exports = (() => {
  const Converter = function Converter() {};

  Converter.prototype.values = (src) => {
    /* eslint no-continue: 0 */
    if (!isStr(src)) {
      return [];
    }

    const vals = [];
    let acc = new Acc();

    for (let i = 0; i < src.length; i += 1) {
      if (Char.isDelimiter(src[i])) {
        acc.increment(i);
        continue;
      }
      if (Char.isDecimal(src[i])) {
        acc.turnDecimalState(i);
        continue;
      }

      const cardinal = Char.cardinal(src[i]);
      if (cardinal !== undefined) {
        if (acc.inside) {
          acc.attachCardinal(i, cardinal);
        } else if (i < cardinal) {
          acc.attachCardinal(i, cardinal);
        }
        continue;
      }

      const number = Char.number(src[i]);
      if (number !== undefined) {
        acc.attachNumber(i, number);
        continue;
      }
      if (!acc.inside) {
        continue;
      }

      vals.push(acc.value());
      acc = new Acc();
    }

    if (acc.inside) {
      vals.push(acc.value());
    }

    return vals;
  };

  Converter.prototype.value = (src) => {
    if (!isStr(src)) {
      return src;
    }

    const vals = Converter.prototype.values(src);
    if (vals.length === 0) {
      return src;
    }

    let start = 0;
    let s = '';
    vals.forEach((val) => {
      s += src.slice(start, val.beg);
      s += val.val;
      start = val.end;
    });
    s += src.slice(start, src.length);

    return s;
  };

  return new Converter();
})();
