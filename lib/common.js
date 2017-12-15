const request = require('request')
const { noop, serialize, wrapper, getTimeStamp } = require('./util')
const { BASE_PATH, TOP_PATH } = require('./CONSTANT')
class Common {
  /**
   * 获取access_token的方法
   */
  async _getToken () {
    return await this.getToken()
  }
  /**
   * 发送钉钉接口的get请求
   * @param {String} path 路径
   * @param {Object} params 请求参数
   */
  async _get (path, params) {
    const accessToken = await this._getToken()
    return await this._request({url: `${BASE_PATH}/${path}?access_token=${accessToken}&${serialize(params)}`})
  }
  /**
   * 发送钉钉接口的post请求
   * @param {String} path 路径
   * @param {Object} body 请求参数
   */
  async _post (path, body) {
    const accessToken = await this._getToken()
    return await this._request({
      url: `${BASE_PATH}/${path}?access_token=${accessToken}`,
      method: 'POST',
      json: true,
      body
    })
  }
  /**
   * 发送TOP请求
   * @param {String} method 请求方法
   * @param {Object} body 请求参数
   */
  async _topPost (method, body) {
    const accessToken = await this._getToken()
    return await this._request({
      url: TOP_PATH,
      method: 'POST',
      form: {
        method,
        session: accessToken,
        timestamp: getTimeStamp(),
        format: 'json',
        simplify: true,
        v: '2.0',
        ...body
      }
    }).then(function (response) {  // 处理返回结果，将结果处理成单层
      const result = {}
      while (response) {
        Object.keys(response).forEach(function (k) {
          if (k !== 'result') {
            result[k] = response[k]
          }
        })
        response = response.result
      }
      return result
    })
  }
  /**
   * request方法promise化
   * @param {Object} options 配置
   */
  _request (options) {
    return new Promise(function (resolve, reject) {
      request(options, wrapper(function (err, data) {
        if (err) {
          return reject(err)
        } else {
          resolve(data)
        }
      }))
    })
  }
  
  /**
   * 获取授权范围
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.McKvsX&treeId=371&articleId=106091&docType=1
   */
  async getAuthScope () {
    return await this._get('/auth/scopes')
  }
}

module.exports = Common