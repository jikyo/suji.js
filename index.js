const Converter = require('./lib/converter');
const Kansuji = require('./lib/kansuji');

module.exports = {
  value: Converter.value,
  values: Converter.values,
  kansuji: Kansuji.kansuji,
  kansujis: Kansuji.kansujis,
};
