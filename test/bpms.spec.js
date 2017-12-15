const assert = require('assert')
const config = require('./config')
const DingApi = require('../')
const Parse = require('./parse')

describe('Department', function () {
  const dingApi = new DingApi(async function getToken() {
    const token = await new Parse.Query('DingDingToken').equalTo('name', config.dingName).first()
    return token.get('access_token')
  })
  describe('getProcessList()', function() {
    it('should ok', async function () {
      const result = await dingApi.getProcessList({
        process_code: 'PROC-FF6YBV6WQ2-OALFMUJAVETPRK3K89JS1-IBXY3BVI-N7',
        start_time: '2017-11-01'
      })
      assert.equal(result.success, true)
    })
  })
  describe('getAllProcessList()', function() {
    it.only('should ok', async function () {
      const result = await dingApi.getAllProcessList({
        process_code: 'PROC-FF6YBV6WQ2-OALFMUJAVETPRK3K89JS1-IBXY3BVI-N7',
        start_time: '2017-11-01'
      })
      assert.ok(Array.isArray(result))
    })
  })
})
