const assert = require('assert');
const app = require('../../src/app');

describe('\'swap\' service', () => {
  it('registered the service', () => {
    const service = app.service('swap');

    assert.ok(service, 'Registered the service');
  });
});
