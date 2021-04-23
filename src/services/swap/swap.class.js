const logger = require('../../logger.js')
const { MethodNotAllowed, BadRequest } = require('@feathersjs/errors');
const { open } = require('fs/promises');
const path = require('path');


/* eslint-disable no-unused-vars */
exports.Swap = class Swap {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    throw new MethodNotAllowed('Not implemented')
  }

  async get (id, params) {
    let filehandle;
    let content
    let gqrx_mode = 'error'
    let gqrx_status = 'error'
    try {
      try {
        filehandle = await open(path.resolve(__dirname, '../../../data/gqrx.state'), 'r');
        content = await filehandle.readFile()
      } finally {
        await filehandle?.close();
      }
      gqrx_status = content.toString().replace(/\n/g,'')
    }catch (error) {
      logger.error(error)
      return {
        success: false,
        reason: error.message,
        gqrx_mode,
        gqrx_status
      }
    }
    try {
      try {
        filehandle = await open(path.resolve(__dirname, '../../../data/gqrx_mode.pid'), 'r');
        content = await filehandle.readFile()
      } finally {
        await filehandle?.close();
      }
      gqrx_mode = content.toString().replace(/\n/g,'')
    }catch (error) {
      logger.error(error)
      return {
        success: false,
        reason: error.message,
        gqrx_mode,
        gqrx_status
      }
    }
    return {
      success: true,
      gqrx_mode,
      gqrx_status
    }
  }

  async create (data, params) {
    if (!data.mode || (data.mode !== 'vhf' && data.mode !== 'hf')) {
      throw new BadRequest('Invalid mode')
    }

    let filehandle
    try {
      try {
        filehandle = await open(path.resolve(__dirname, `../../../data/gqrx.${data.mode}.swap`), 'w');
      } finally {
        await filehandle?.close();
      }
    }catch (error) {
      logger.error(error)
      return {
        success: false,
        reason: error.message
      }
    }
    return {
      success: true
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
