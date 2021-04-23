const logger = require('../../logger.js')
const { MethodNotAllowed, BadRequest } = require('@feathersjs/errors');
const { read } = require('../../logger.js');

/* eslint-disable no-unused-vars */
exports.Scan = class Scan {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find (params) {
    throw new MethodNotAllowed('Not implemented')
  }

  async get (id, params) {
    if (!id || parseInt(id) < 0 || isNaN(id)) {
      throw new BadRequest('Invalid MHZ reference!')
    }

    let res = undefined;
    const start_mhz = parseInt(id) * 1000 * 1000;
    const end_mhz = start_mhz + (1000 * 1000);
    let mhz = start_mhz;
    const fstep = 5 * 1000;
    const read_count = 3;
    let signal_strong_ref = -30;
    let freadings = [];
    let fstrong = [];
    let dbm_avarage = 0;
    let dbm = 0;
    const gqrx = this.app.get('gqrxClient')

    try {
      for ( mhz = start_mhz; mhz <= end_mhz; mhz += fstep) {
        try {
          res = await gqrx.send(`F ${mhz}`);
        } catch (ef) {
          logger.warn(`Problem on read freq, jumping to next`)
          continue
        }
        res = res.replace(/\n/g,'')

        if (res === 'RPRT 1') {
          logger.warn("Problem when scanning frequency");
          break;
        }

        dbm = -200;
        for (let c = 0; c<read_count; c++) {
          try {
            res = await gqrx.send(`l STRENGTH`);
          } catch (es) {
            logger.warn(`Problem on read dbm, jumping to next`)
            continue
          }
          res = res.replace(/\n/g,'')

          if (res === 'RPRT 1') {
            logger.warn("Problem when scanning frequency");
            continue;
          } 

          const dbm_read = parseFloat(res)
          if ( dbm_read > dbm) {
            dbm = dbm_read
          }
        }

        if (!isNaN(dbm)) {
          freadings.push({
            freq: (parseFloat(mhz)/1000).toFixed(2),
            dbm: dbm
          })
        }
      }

      // Generate dBm Avarage
      dbm_avarage = -200
      for (const fread in freadings) {
        dbm_avarage += freadings[fread].dbm
      }
      if (!isNaN(dbm_avarage)) {
        dbm_avarage = parseFloat(dbm_avarage/freadings.length)
      }

      // Cut frequencies under dBm Avarage
      for (const fread in freadings) {
        if (freadings[fread].dbm >= dbm_avarage) {
          fstrong.push(freadings[fread])
        }
      }

      // Sort by dbm
      fstrong.sort((a, b) => {
        if (a.dbm < b.dbm) {
          return 1
        } else if (a.dbm == b.dbm) {
          return 0
        }
        return -1
      })

      // Reduce to top 10
      if (fstrong.length > 10) {
        fstrong = fstrong.slice(0,9)
      }

      // Sort by freq
      fstrong.sort((a, b) => {
        if (b.freq > a.freq) {
          return 1
        } else if (a.freq == b.freq) {
          return 0
        }
        return -1
      })

      return({
        success: true,
        frequencies: fstrong
      })
    } catch (error) {
      logger.error(error)
      return {
        success: false,
        reason: error.message
      }
    }
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
