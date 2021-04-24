// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
'use strict'
const logger = require('../logger.js')
const telnet = require('telnet-client')

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let connection
    const app = context.app

    try {
      connection = app.get('gqrxClient')
      await connection.send('l')
      return context;
    } catch(error) {
      connection = new telnet()
    }

    let params = {
      host: app.get('gqrx').host,
      port: parseInt(app.get('gqrx').port),
      timeout: parseInt(app.get('gqrx').timeout),
      negotiationMandatory: false,
      debug: true,
      sendTimeout: 50
    }

    try {
      await connection.connect(params)
      logger.info("GQRX - Connected")

      app.set('gqrxClient', connection)
    } catch (exception) {
      
      if (exception.code === 'ECONNREFUSED') {
        logger.error("GQRX - Couldn't connect, verify if the HOST/PORT is correct and enabled into the app (Menu Tools, Option 'Remote control') and if the host is allowed in its settings.")
      } else {
        logger.error(exception)
      }
      app.set('gqrxClient', null)
      return context;
    };
  }
};
