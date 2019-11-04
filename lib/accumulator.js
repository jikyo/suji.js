/**
 * Accumulator for the input string.
 */
module.exports = class Acc {
  /**
  * constructor.
  */
  constructor() {
    this.inside = false;
    this.beg = undefined;
    this.end = undefined;
    this.val = 0;
    this.valCardinal = 0;
    this.lastCardinal = 10;
    this.base = 10;
  }

  /**
  * increment the end postion.
  * @param {number} index The position to increment the end position.
  */
  increment(index) {
    if (!this.inside) {
      return;
    }
    if (this.beg === undefined) {
      this.beg = index;
      this.end = index + 1;
      return;
    }
    this.end += 1;
  }

  /**
  * turn the deciaml state.
  * @param {number} index The position.
  */
  turnDecimalState(index) {
    if (!this.inside) {
      this.inside = true;
    }
    this.increment(index);
    this.base = 0.1;
  }

  /**
  * turn the deciaml state.
  * @param {number} index The position.
  * @param {number} cardinal The position.
  */
  attachCardinal(index, cardinal) {
    this.inside = true;
    this.increment(index);

    const val = (this.val === 0)
      ? 1
      : this.val;

    if (this.lastCardinal < cardinal) {
      this.valCardinal = (this.val === 0 && this.valCardinal !== 0)
        ? this.valCardinal * cardinal
        : (this.valCardinal + val) * cardinal;
    } else {
      this.valCardinal = this.valCardinal + (val * cardinal);
    }

    this.lastCardinal = cardinal;
    this.val = 0;
  }

  /**
  * attach the input number at the index.
  * @param {number} index The position.
  * @param {number} number The value to attach.
  */
  attachNumber(index, number) {
    this.inside = true;
    this.increment(index);
    if (this.base < 1) {
      this.val = this.val + (number * this.base);
      this.base *= 0.1;
    } else {
      this.val = (this.val * this.base) + number;
    }
  }

  /**
  * return the result object of this accumulator.
  * @return {Object} the value of this accumulator
  */
  value() {
    return {
      val: this.valCardinal + this.val,
      beg: this.beg,
      end: this.end,
    };
  }
};
