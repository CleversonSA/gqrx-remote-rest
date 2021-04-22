const assert = require('assert');
const app = require('../../src/app');

describe('\'modulation\' service', () => {
  it('registered the service', () => {
    const service = app.service('modulation');

    assert.ok(service, 'Registered the service');
  });
});
