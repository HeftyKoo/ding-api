const assert = require('assert')
const config = require('./config')
const DingApi = require('../')
const Parse = require('./parse')

describe('User', function () {
  const dingApi = new DingApi(async function getToken() {
    const token = await new Parse.Query('DingDingToken').equalTo('name', config.dingName).first()
    return token.get('access_token')
  })
  describe('getUserDetailById()', function () {
    it.only('should ok', async function () {
      const result = await dingApi.getUserDetailById('105050601736317812')
      assert.equal(result.errcode, 0)
    })
  })
  describe('getUserListByDepartment()', function() {
    it('should ok', async function () {
      const result = await dingApi.getUserListByDepartment(23179233)
      assert.equal(result.errcode, 0)
    })
  })
  describe('getUserDetailByDepartment()', function() {
    it('should ok', async function () {
      const result = await dingApi.getUserDetailByDepartment(23179233, 0, 1)
      assert.equal(result.errcode, 0)
    })
  })
  describe('getAllDepartmentUsers()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAllDepartmentUsers(23179233)
      assert.ok(Array.isArray(result))
    })
  })
  describe('getAllDepartmentUserDetails()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAllDepartmentUserDetails(23179233)
      assert.ok(Array.isArray(result))
    })
  })
  describe('getAdminList()', function () {
    it('should ok', async function () {
      const result = await dingApi.getAdminList()
      assert.equal(result.errcode, 0)
    })
  })
  describe('getUseridByUnionid()', function () {
    it('should ok', async function () {
      const result = await dingApi.getUseridByUnionid('VJj3KgQ8iS2ojWXkCzw7zOgiEiE')
      assert.equal(result.errcode, 0)
    })
  })
  describe('getAllUserList()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAllUserList()
      assert.ok(Array.isArray(result))
    })
  })
  describe('getAllUserDetailList()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAllUserDetailList()
      assert.ok(Array.isArray(result))
    })
  })
})
