const logger = require('../../logger.js')
const { MethodNotAllowed, BadRequest } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Frequency = class Frequency {
  setup(app) {
    this.app = app;
  }

  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let res = undefined;
    try {
      res = await this.app.get('gqrxClient').send('f');
      res = res.replace(/\n/g,'')
      return ({
        success: true,
        frequency: parseFloat(res)
      })
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
    if (!data.frequency || isNaN(data.frequency)) {
      throw new BadRequest('Invalid frequency')
    }

    let res = undefined;
    try {
      res = await this.app.get('gqrxClient').send(`F ${data.frequency}`);
      res = res.replace(/\n/g,'')
      if (res === 'RPRT 0') {
        return ({
          success: true
        })
      } else {
        return ({
          success: false,
          reason: 'Invalid frequency or GQRX state'
        })
      }      
    } catch (error) {
      logger.error(error)
      return {
        success: false,
        reason: error.message
      }
    }
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
