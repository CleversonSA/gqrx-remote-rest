const logger = require('../../logger.js')
const { MethodNotAllowed, BadRequest } = require('@feathersjs/errors');
const modulations = require('./modulation.config.js')

/* eslint-disable no-unused-vars */
exports.Modulation = class Modulation {
  setup(app) {
    this.app = app;
  }

  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let res = undefined;
    try {
      res = await this.app.get('gqrxClient').send(`m`);
      res = res.split('\n')
      if (res[0] === 'RPRT 1') {
        return ({
          success: false,
          reason: 'Invalid GQRX state'
        })
      }
      let modulation = {}
      for (let mode in modulations) {
        if (modulations[mode].opcode === res[0]) {
          modulation.mode = mode
          break;
        }
      }
      const bandwith_hz = parseInt(res[1])
      switch (bandwith_hz) {
        case modulations[modulation.mode].wide:
          modulation.bandwith = "wide"
          break;

        case modulations[modulation.mode].normal:
          modulation.bandwith = "normal"
          break;
 
        case modulations[modulation.mode].narrow:
          modulation.bandwith = "narrow"
          break;
        
        default:
          modulation.bandwith = "user"
          modulation.bandwith_size = bandwith_hz
      }

      return {
        sucess: true,
        modulation
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
    if (!data.mode || data.mode === "") {
      throw new BadRequest('Invalid mode')
    }
    if (!data.bandwidth || data.bandwidth === "") {
      throw new BadRequest('Invalid bandwidth')
    }
    let modulation = modulations[data.mode]
    if (!modulation) {
      throw new BadRequest('Invalid mode')
    }
    if (!modulation[data.bandwidth]) {
      throw new BadRequest('Invalid bandwidth')
    }

    let found_modulation = {}
    Object.assign(found_modulation, modulation)

    if (data.bandwidth === "user") {
      if (!data.bandwidth_size || isNaN(data.bandwidth_size)) {
        throw new BadRequest('Bandwidth size is need for user mode or has invalid value')
      }
      found_modulation.user = parseInt(data.bandwidth_size);
    }

    let res = undefined;
    try {
      res = await this.app.get('gqrxClient').send(`M ${found_modulation.opcode} ${found_modulation[data.bandwidth]}`);
      res = res.replace(/\n/g,'')
      if (res === 'RPRT 0') {
        return ({
          success: true
        })
      } else {
        return ({
          success: false,
          reason: 'Invalid modulation or GQRX state'
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
