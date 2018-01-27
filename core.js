'use strict'
// import necessary packages
const hapi = require('hapi')
const winston = require('winston')
const colors = require('colors/safe')
const nconf = require('nconf')

// Load config & lib
const Routes = require('./src/route')
// const mail = require('./src/mail')

// Pre Start
const preStart = require('./src/prestart')
preStart.load()

// Define base info
const server = hapi.server({
  host: nconf.get('server:host'),
  port: nconf.get('server:port')
})

// load route
async function loadRoute (routes) {
  try {
    await routes.then(route => {
      // console.log(route)
      route.map((item, index, input) => {
        server.route(item)
      })
    })
  } catch (e) {
    winston.error(e)
    // mail.error(e)
    process.exit(1)
  }
}
const routes = new Routes()
loadRoute(routes)

// Start Server
async function start () {
  try {
    await server.start()
  } catch (e) {
    winston.error(e)
    // mail.error(e)
    process.exit(1)
  }
}

start()
winston.info(colors.green('Server is started. Listening on Port:' + nconf.get('server:port')))
