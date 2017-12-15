const { mixin } = require('./lib/util')
const Common = require('./lib/common')
const Department = require('./lib/department')
const User = require('./lib/user')
const Attendance = require('./lib/attendance')

class DingApi extends mixin(
  Common, 
  Department, 
  User,
  Attendance
) {
  constructor (getToken) {
    super()
    this.getToken = getToken
  }
}

module.exports = DingApi