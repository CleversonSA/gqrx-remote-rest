// Initializes the `swap` service on path `/swap`
const { Swap } = require('./swap.class');
const hooks = require('./swap.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/swap', new Swap(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('swap');

  service.hooks(hooks);
};
