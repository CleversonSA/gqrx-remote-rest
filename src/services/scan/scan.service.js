// Initializes the `scan` service on path `/scan`
const { Scan } = require('./scan.class');
const hooks = require('./scan.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/scan', new Scan(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('scan');

  service.hooks(hooks);
};
