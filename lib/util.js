exports.noop = function () {}

exports.wrapper = function (callback = function(){}) {
  return function (err, res, data) {
    data = data && (typeof data === 'string' ? JSON.parse(data) : data)
    if (err) {
      err.name = 'DingApi' + err.name
      return callback(err, data)
    }
    if (data && data.errcode) {
      console.log(data)
      err = new Error()
      err.name = 'DingApiError'
      err.code = data.errcode
      return callback(err, data)
    }
    // 处理TOP请求
    if (data && data.error_response) {
      err = new Error()
      err.name = 'TopApiError'
      err.code = data.error_response.code,
      err.message = data.error_response.sub_msg
    }
    if (data == null) {
      err = new Error('No data received.');
      err.name = 'DingAPIError';
      err.code = -1;
      return callback(err, data);
    }
    callback(err, data)
  }
}

exports.serialize = function(params = {}) {
  const arr = Object.keys(params)
    .filter(key => typeof params[key] !== 'undefined')
    .map(key => `${key}=${params[key]}`)
  return arr.join('&')
}

const padStart = exports.padStart = function (str, limit, padStr) {
  let target = `${str}`
  let len = limit - target.length
  while(len > 0) {
    target = `${padStr}` + target
    len--
  }
  return target
}

exports.getTimeStamp = function (time) {
  const pad = function (str) {
    return padStart(str, 2, '0')
  }
  const date = time ? new Date(time) : new Date()
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

exports.mixin = function (...minxins) {
  class Mixin {
    
  }
  for (let mix of minxins) {
    copyProperties(Mixin, mix)
    copyProperties(Mixin.prototype, mix.prototype)
  }

  function copyProperties (target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== "name") {
        const desc = Object.getOwnPropertyDescriptor(source, key)
        Object.defineProperty(target, key, desc)
      }
    }
  }
  return Mixin
}

exports.uniqBy = function (array, key) {
  const cache = new Map()
  const result = []
  array.forEach(function (item) {
    const diff = item[key]
    if (!cache.has(diff)) {
      result.push(item)
      cache.set(diff, true)
    }
  })
  return result
}