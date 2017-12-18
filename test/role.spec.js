const assert = require('assert')
const config = require('./config')
const DingApi = require('../')
const Parse = require('./parse')

describe('User', function () {
  const dingApi = new DingApi(async function getToken() {
    const token = await new Parse.Query('DingDingToken').equalTo('name', config.dingName).first()
    return token.get('access_token')
  })
  describe('getRoleList()', function () {
    it('should ok', async function () {
      const result = await dingApi.getRoleList()
      assert.ok(Array.isArray(result.list))
    })
  })
  describe('getRoleSimpleList()', function () {
    it('should ok', async function () {
      const result = await dingApi.getRoleSimpleList(78812889)
      assert.ok(Array.isArray(result.list))
    })
  })
  describe('getAllRoleList()', function () {
    it('should ok', async function () {
      const result = await dingApi.getAllRoleList()
      assert.ok(Array.isArray(result))
    })
  })
  describe('getRoleAllSimpleList()', function () {
    it('should ok', async function () {
      const result = await dingApi.getRoleAllSimpleList(78812889)
      assert.ok(Array.isArray(result))
    })
  })
})
