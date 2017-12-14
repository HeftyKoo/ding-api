const { mixin } = require('./lib/util')
const Common = require('./lib/common')
const Department = require('./lib/department')
const User = require('./lib/user')

class DingApi extends mixin(Common, Department, User) {
  constructor (getToken) {
    super()
    this.getToken = getToken
  }
}

module.exports = DingApi