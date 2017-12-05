'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_URL: '"ws://localhost:4000"',
  API_URL: '"http://localhost:4000"'
})
