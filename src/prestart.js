'use strict'
const winston = require('winston')
const nconf = require('nconf')
const pkg = require('../package.json')
const path = require('path')
const dirname = path.join(__dirname, '../')

function setupWinston () {
  winston.remove(winston.transports.Console)
  winston.add(winston.transports.Console, {
    colorize: nconf.get('log-colorize') !== 'false',
    timestamp: function () {
      var date = new Date()
      return nconf.get('json-logging') ? date.toJSON()
        : date.toISOString() + ' [' + global.process.pid + ']'
    },
    level: nconf.get('log-level') || (global.env === 'production' ? 'info' : 'verbose'),
    json: !!nconf.get('json-logging'),
    stringify: !!nconf.get('json-logging')
  })
}

function loadConfig (configFile) {
  winston.verbose('* using configuration stored in: %s', configFile)

  nconf.file({
    file: configFile
  })

  nconf.defaults({
    base_dir: dirname,
    version: pkg.version
  })

  if (!nconf.get('isCluster')) {
    nconf.set('isPrimary', 'true')
    nconf.set('isCluster', 'false')
  }
}

module.exports = {
  load: () => {
    setupWinston()
    loadConfig(path.join(__dirname, '../', 'config.json'))
  }
}
