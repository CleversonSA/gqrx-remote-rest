const path = require('path');

module.exports = {
  "host": process.env.APP_HOST || 'localhost',
  "port": process.env.APP_PORT || 3030,
  "'public": path.resolve(__dirname, '../public/'),
  "paginate": {
    "default": 10,
    "max": 50
  },
  "gqrx" : {
    "host": process.env.GQRX_HOST || '127.0.0.1',
    "port": process.env.GQRX_PORT || 7356,
    "timeout": process.env.GQRX_TIMEOUT || 60 * 1000
  }
}