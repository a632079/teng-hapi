'use strict'
// Load Packages
const fs = require('fs')
const winston = require('winston')
const colors = require('colors/safe')

class controller {
  constructor () {
    return this.load()
  }
  async load () {
    try {
      // Load Controllers
      let controllers = {}
      const dir = fs.readdirSync('./src/controller')
      await dir.map((item, index, input) => {
        controllers[item.substring(0, item.length - 3)] = module.parent.require('./src/controller/' + item)
      })
      return controllers
    } catch (e) {
      winston.error(colors.red(e))
      process.exit(1)
    }
  }
}

module.exports = controller
