const assert = require('assert')
const config = require('./config')
const DingApi = require('../')
const Parse = require('./parse')

describe('Department', function () {
  const dingApi = new DingApi(async function getToken() {
    const token = await new Parse.Query('DingDingToken').equalTo('name', config.dingName).first()
    return token.get('access_token')
  })
  describe('getDepartmentListById()', function() {
    it('should ok', async function () {
      const result = await dingApi.getDepartmentListById(31441349)
      assert.equal(result.errcode, 0)
      assert.ok(Object.keys(result).includes('department'))
    })
  })
  describe('getDepartmentDetailById()', function () {
    it('shold ok', async function () {
      const result = await dingApi.getDepartmentDetailById(31441349)
      assert.equal(result.errcode, 0)
    })
  })
  describe('getAllDepartment()', function () {
    it('should ok', async function () {
      const result = await dingApi.getAllDepartment()
      assert.ok(Array.isArray(result))
    })
  })
  describe('getAllDepartmentDetail()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAllDepartmentDetail()
      assert.ok(Array.isArray(result))
    })
  })
})
