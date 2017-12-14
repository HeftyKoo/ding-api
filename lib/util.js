exports.noop = function () {}

exports.wrapper = function (callback = function(){}) {
  return function (err, res, data) {
    data = data && JSON.parse(data)
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