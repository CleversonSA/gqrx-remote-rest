const assert = require('assert');
const app = require('../../src/app');

describe('\'smeter\' service', () => {
  it('registered the service', () => {
    const service = app.service('smeter');

    assert.ok(service, 'Registered the service');
  });
});
