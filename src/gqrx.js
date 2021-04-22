'use strict'
const logger = require('./logger.js')
const telnet = require('telnet-client')

module.exports = async function (app) {

  const connection = new telnet()

  let params = {
    host: app.get('gqrx').host,
    port: parseInt(app.get('gqrx').port),
    timeout: parseInt(app.get('gqrx').timeout),
    negotiationMandatory: false,
    debug: true
  }

  try {
    await connection.connect(params)
    logger.info("GQRX - Connected")

    connection.on('timeout', async () => {
      logger.info("GQRX - Connection timeout")
      await connection.end()
      await connection.connect(params)
      logger.info("GQRX - Reconnected")
    })
        
    app.set('gqrxClient', connection)
  } catch (exception) {
    
    if (exception.code === 'ECONNREFUSED') {
      logger.error("GQRX - Couldn't connect, verify if the HOST/PORT is correct and enabled into the app (Menu Tools, Option 'Remote control') and if the host is allowed in its settings.")
    } else {
      logger.error(exception)
    }
    app.set('gqrxClient', null)
  }
  
}