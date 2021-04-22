// Initializes the `modulation` service on path `/modulation`
const { Modulation } = require('./modulation.class');
const hooks = require('./modulation.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/modulation', new Modulation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('modulation');

  service.hooks(hooks);
};
