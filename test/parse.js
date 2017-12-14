const config = require('./config')
const Parse = require('parse/node')

Parse.initialize(config.appId)
Parse.serverURL = config.serverURL

module.exports = Parse