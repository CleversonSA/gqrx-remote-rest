// Initializes the `frequency` service on path `/frequency`
const { Frequency } = require('./frequency.class');
const hooks = require('./frequency.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/frequency', new Frequency(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('frequency');

  service.hooks(hooks);
};
