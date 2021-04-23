const assert = require('assert');
const app = require('../../src/app');

describe('\'scan\' service', () => {
  it('registered the service', () => {
    const service = app.service('scan');

    assert.ok(service, 'Registered the service');
  });
});
