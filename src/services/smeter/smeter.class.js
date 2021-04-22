const logger = require('../../logger.js')
const { MethodNotAllowed, BadRequest } = require('@feathersjs/errors');
const smeterScales = require('./smeter.config.js')

/* eslint-disable no-unused-vars */
exports.Smeter = class Smeter {
  setup(app) {
    this.app = app;
  }

  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let res = undefined;
    try {
      res = await this.app.get('gqrxClient').send('l');
      res = res.replace(/\n/g,'')
      if (res === 'RPRT 1') {
        return ({
          success: false,
          reason: 'Invalid GQRX state'
        })
      }      

      const dbfs = parseFloat(res)

      let scale = {}
      for (let smeterScale in smeterScales) {
        if (dbfs >= smeterScales[smeterScale].dbFS ) {
          Object.assign(scale,smeterScales[smeterScale])
          scale.smeter = smeterScale
          scale.dbFS = dbfs
        }
      }

      return {
        success: true,
        scale
      }

    } catch (error) {
      logger.error(error)
      return {
        success: false,
        reason: error.message
      }
    }
  }

  async get (id, params) {
    throw new MethodNotAllowed('Not implemented')
  }

  async create (data, params) {
    throw new MethodNotAllowed('Not implemented')
  }

  async update (id, data, params) {
    throw new MethodNotAllowed('Not implemented')
  }

  async patch (id, data, params) {
    throw new MethodNotAllowed('Not implemented')
  }

  async remove (id, params) {
    throw new MethodNotAllowed('Not implemented')
  }
};
