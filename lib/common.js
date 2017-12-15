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
   * 发送请求
   * @param {String} path 
   * @param {Object} params 
   */
  _get (path, params) {
    return this._getToken().then(function (accessToken) {
      return new Promise(function (resolve, reject) {
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
  async _post (path, body) {
    const accessToken = await this._getToken()
    return await this._basePost(`${BASE_PATH}/${path}?access_token=${accessToken}`, body)
  }
  async _topPost (method, body) {
    const accessToken = await this._getToken()
    return await this._basePost(TOP_PATH, {
      method,
      session: accessToken,
      timestamp: getTimeStamp(),
      format: 'json',
      simplify: true,
      v: '2.0',
      ...body
    }).then(function (response) {
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
  _basePost (url, body) {
    return new Promise(function (resolve, reject) {
      request({
        url,
        method: 'POST',
        json: true,
        body
      }, wrapper(function (err, data) {
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