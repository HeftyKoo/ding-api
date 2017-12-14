const request = require('request')
const { noop, serialize, wrapper } = require('./util')
const { BASE_PATH } = require('./CONSTANT')
class Common {
  /**
   * 获取access_token的方法
   */
  async _getToken () {
    return await this.getToken()
  }
  /**
   * 发送请求
   * @param {String} path 
   * @param {Object} params 
   */
  _request (path, params) {
    return this._getToken().then(function (accessToken) {
      return new Promise (function (resolve, reject) {
        request(`${BASE_PATH}/${path}?access_token=${accessToken}&${serialize(params)}`, wrapper(function (err, data) {
          if (err) {
            return reject(err)
          } else {
            return resolve(data)
          }
        }))
      })
    })
  }
  /**
   * 获取授权范围
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.McKvsX&treeId=371&articleId=106091&docType=1
   */
  async getAuthScope () {
    return await this._request('/auth/scopes')
  }
}

module.exports = Common