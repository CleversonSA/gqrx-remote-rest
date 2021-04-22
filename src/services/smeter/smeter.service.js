// Initializes the `smeter` service on path `/smeter`
const { Smeter } = require('./smeter.class');
const hooks = require('./smeter.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/smeter', new Smeter(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('smeter');

  service.hooks(hooks);
};
