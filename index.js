const { mixin } = require('./lib/util')
const Common = require('./lib/common')
const Department = require('./lib/department')
const User = require('./lib/user')
const Attendance = require('./lib/attendance')
const Bpms = require('./lib/bpms')
const Role = require('./lib/role')

class DingApi extends mixin(
  Common, 
  Department, 
  User,
  Attendance,
  Bpms,
  Role
) {
  constructor (getToken) {
    super()
    this.getToken = getToken
  }
}

module.exports = DingApi