const frequency = require('./frequency/frequency.service.js');
const modulation = require('./modulation/modulation.service.js');
const smeter = require('./smeter/smeter.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(frequency);
  app.configure(modulation);
  app.configure(smeter);
};
