'use strict'

const hello = {}

hello.index = (req, h) => {
  return h.response({
    message: 'Hello World',
    ts: Date.now()
  })
}

module.exports = hello
