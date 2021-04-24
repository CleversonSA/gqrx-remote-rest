const gqrx = require('../../hooks/gqrx.js')

module.exports = {
  before: {
    all: [],
    find: [
      gqrx()
    ],
    get: [],
    create: [
      gqrx()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
