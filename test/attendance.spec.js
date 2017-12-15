const assert = require('assert')
const config = require('./config')
const DingApi = require('../')
const Parse = require('./parse')

describe('Attendance', function () {
  const dingApi = new DingApi(async function getToken() {
    const token = await new Parse.Query('DingDingToken').equalTo('name', config.dingName).first()
    return token.get('access_token')
  })
  describe('getAttendanceList()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAttendanceList('2017-12-01 09:00:00', '2017-12-02 18:30:00')
      assert.equal(result.errcode, 0)
    })
  })
  describe('getAllAttendanceList()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAllAttendanceList('2017-12-01 09:00:00', '2017-12-02 18:30:00')
      assert.ok(Array.isArray(result))
    })
  })
  describe('getAttendanceListRecord()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAttendanceListRecord('2017-12-01 09:00:00', '2017-12-08 18:30:00',['105050601736317812'])
      assert.equal(result.errcode, 0)
    })
  })
  describe('getAllUserAttendanceListRecord()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAllUserAttendanceListRecord('2017-12-01 09:00:00', '2017-12-02 18:30:00')
      assert.ok(Array.isArray(result))
    })
  })
  describe('getLeaveApproveDuration()', function () {
    it.only('shold ok', async function () {
      const result = await dingApi.getLeaveApproveDuration('105050601736317812', '2017-12-01 09:00:00', '2017-12-02 18:30:00')
      assert.equal(result.success, true)
      assert.ok(typeof result.duration_in_minutes === 'number')
    })
  })
})
