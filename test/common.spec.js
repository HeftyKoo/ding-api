const assert = require('assert')
const config = require('./config')
const DingApi = require('../')
const Parse = require('./parse')

describe('Common', function () {
  const dingApi = new DingApi(async function getToken() {
    const token = await new Parse.Query('DingDingToken').equalTo('name', config.dingName).first()
    return token.get('access_token')
  })
  describe('getAuthScope()', function() {
    it('should ok', async function () {
      const result = await dingApi.getAuthScope()
      assert.equal(result.errcode, 0)
      assert.ok(Object.keys(result).includes('auth_org_scopes'))
    })
  })
})
