const METHOD_PREFIX = 'dingtalk.smartwork.bpms.'
class Bpms {
  async processCopy (params) {
    return this._topPost(`${METHOD_PREFIX}process.copy`, params)
  }
  async processSync (params) {
    return this._topPost(`${METHOD_PREFIX}process.sync `, params)
  }
  async processCreate (params) {
    return await this._topPost(`${METHOD_PREFIX}processinstance.create`, params)
  }
  async getProcessInstance (process_instance_id) {
    return await this._topPost(`${METHOD_PREFIX}processinstance.get`, {
      process_instance_id
    })
  }
  async getProcessList (params) {
    const options = Object.assign({}, params)
    options.start_time = new Date(options.start_time).getTime()
    options.end_time = options.end_time && new Date(options.end_time).getTime()
    return await this._topPost(`${METHOD_PREFIX}processinstance.list`, options)
  }
  async getAllProcessList (params) {
    return await this._getAllProcessList(params)
  }
  async _getAllProcessList (params, container = []) {
    const result = await this.getProcessList(params)
    container.push(...result.list)
    if (result.next_cursor) {
      const options = Object.assign({},params)
      options.cursor = result.next_cursor
      await this._getAllProcessList(options, container)
    }
    return container
  }
}

module.exports = Bpms