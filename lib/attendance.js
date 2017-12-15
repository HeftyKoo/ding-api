const METHOD_PREFIX = 'dingtalk.smartwork.attends.'
class Attendance {
  /**
   * 考勤打卡结果
   * @param {String} workDateFrom 查询考勤打卡记录的起始工作日 "yyyy-MM-dd hh:mm:ss"
   * @param {String} workDateTo 查询考勤打卡记录的结束工作日 "yyyy-MM-dd hh:mm:ss"
   * @param {Number} offset 表示获取考勤数据的起始点，第一次传0，如果还有多余数据，下次获取传的offset值为之前的offset+limit
   * @param {Number} limit 表示获取考勤数据的条数，最大不能超过50条
   * @param {Array} userIdList 员工在企业内的UserID列表，企业用来唯一标识用户的字段
   */
  async getAttendanceList (workDateFrom, workDateTo, offset = 0, limit = 50, userIdList) {
    return await this._post('attendance/list', {workDateFrom, workDateTo, offset, limit, userIdList})
  }
  /**
   * 获取所有考勤打卡结果
   * @param {String} workDateFrom 查询考勤打卡记录的起始工作日 "yyyy-MM-dd hh:mm:ss"
   * @param {String} workDateTo 查询考勤打卡记录的结束工作日 "yyyy-MM-dd hh:mm:ss"
   * @param {Array} userIdList 员工在企业内的UserID列表，企业用来唯一标识用户的字段
   */
  async getAllAttendanceList (workDateFrom, workDateTo, userIdList) {
    return await this._getAllAttendanceList(workDateFrom, workDateTo, userIdList)
  }
  /**
   * 获取考勤打卡记录
   * @param {String} checkDateFrom 查询考勤打卡记录的起始工作日 "yyyy-MM-dd hh:mm:ss"
   * @param {String} checkDateTo 查询考勤打卡记录的结束工作日 "yyyy-MM-dd hh:mm:ss"
   * @param {Array} userIds 员工在企业内的UserID列表，企业用来唯一标识用户的字段
   */
  async getAttendanceListRecord (checkDateFrom, checkDateTo, userIds) {
    return await this._post('attendance/listRecord',{checkDateFrom, checkDateTo, userIds})
  }
  /**
   * 获取所有员工的打卡记录
   * @param {String} workDateFrom 查询考勤打卡记录的起始工作日 "yyyy-MM-dd hh:mm:ss"
   * @param {String} workDateTo 查询考勤打卡记录的结束工作日 "yyyy-MM-dd hh:mm:ss"
   */
  async getAllUserAttendanceListRecord (workDateFrom, workDateTo) {
    const userList = await this.getAllUserList()
    const userIds = userList.map(item => item.userid)
    return await this._getAllUserAttendanceListRecord(workDateFrom, workDateTo, userIds)
  }
  async getLeaveApproveDuration (userid, from_date, to_date) {
    return await this._topPost(`${METHOD_PREFIX}getleaveapproveduration`, {userid, from_date, to_date})
  }
  /**
   * 获取所有的考勤记录
   * @param {String} workDateFrom 
   * @param {String} workDateTo 
   * @param {Array} userIdList 
   * @param {Number} offset 
   * @param {Number} limit 
   * @param {Array} container 结果容器
   */
  async _getAllAttendanceList (workDateFrom, workDateTo, userIdList, offset = 0, limit = 50, container = []) {
    const result = await this.getAttendanceList(workDateFrom, workDateTo, offset, limit, userIdList)
    container.push(...result.recordresult)
    if (result.hasMore) {
      await this._getAllAttendanceList(workDateFrom, workDateTo, userIdList, offset + limit, limit, container)
    }
    return container
  }
  /**
   * 获取所有的考勤结果
   * @param {String} workDateFrom 
   * @param {String} workDateTo 
   * @param {Array} userIds 
   * @param {Array} container 结果容器
   */
  async _getAllUserAttendanceListRecord (workDateFrom, workDateTo, userIds = [], container = []) {
    if (userIds.length > 0) {
      const result = await this.getAttendanceListRecord(workDateFrom, workDateTo, userIds.slice(0, 50))
      container.push(...result.recordresult)
      await this._getAllUserAttendanceListRecord(workDateFrom, workDateTo, userIds.slice(50), container)
    }
    return container
  }
}

module.exports = Attendance