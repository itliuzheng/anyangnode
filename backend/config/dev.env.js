'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  srconfig: '"testdev"',
  BASE_API:'"http://192.168.11.115:3000"'
  // BASE_API:'"http://192.168.11.115:3000"'
})
