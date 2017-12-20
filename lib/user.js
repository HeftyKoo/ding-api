const { uniqBy } = require('./util')
class User {
  /**
   * 获取用户谰
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.br8gJr&treeId=385&articleId=106816&docType=1#s1
   * @param {String} userid 员工在企业内的UserID
   * @param {String} [lang] 通讯录语言(默认zh_CN另外支持en_US) 
   */
  async getUserDetailById (userid, lang) {
    return await this._get('/user/get', {userid, lang})
  }
  /**
   * 获取部门成员
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.br8gJr&treeId=385&articleId=106816&docType=1#s6
   * @param {String} department_id 获取的部门id
   * @param {Number} [offset] 支持分页查询，与size参数同时设置时才生效，此参数代表偏移量 
   * @param {Number} [size] 支持分页查询，与size参数同时设置时才生效，此参数代表偏移量 
   * @param {Number} [order] 支持分页查询，部门成员的排序规则，默认不传是按自定义排序；entry_asc代表按照进入部门的时间升序，entry_desc代表按照进入部门的时间降序，modify_asc代表按照部门信息修改时间升序，modify_desc代表按照部门信息修改时间降序，custom代表用户定义(未定义时按照拼音)排序 
   * @param {Number} [lang] 通讯录语言(默认zh_CN另外支持en_US) 
   */
  async getUserListByDepartment (department_id, offset, size, order, lang) {
    return await this._get('/user/simplelist', {department_id, offset, size, order, lang})
  }
  /**
   * 获取部门成员详情
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.br8gJr&treeId=385&articleId=106816&docType=1#s7
   * @param {String} department_id 获取的部门id
   * @param {Number} [offset] 支持分页查询，与size参数同时设置时才生效，此参数代表偏移量 
   * @param {Number} [size] 支持分页查询，与size参数同时设置时才生效，此参数代表偏移量 
   * @param {Number} [order] 支持分页查询，部门成员的排序规则，默认不传是按自定义排序；entry_asc代表按照进入部门的时间升序，entry_desc代表按照进入部门的时间降序，modify_asc代表按照部门信息修改时间升序，modify_desc代表按照部门信息修改时间降序，custom代表用户定义(未定义时按照拼音)排序 
   * @param {Number} [lang] 通讯录语言(默认zh_CN另外支持en_US) 
   */
  async getUserDetailByDepartment (department_id, offset, size, order, lang) {
    return await this._get('/user/list', {department_id, offset, size, order, lang})
  }
  /**
   * 根据unionid获取成员的userid
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.br8gJr&treeId=385&articleId=106816&docType=1#s8
   */
  async getAdminList () {
    return await this._get('/user/get_admin')
  }
  /**
   * 根据
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.br8gJr&treeId=385&articleId=106816&docType=1#s9
   * @param {String} unionid 
   */
  async getUseridByUnionid (unionid) {
    return await this._get('/user/getUseridByUnionid', {unionid})
  }
  /**
   * 获取部门的所有成员
   * @param {String} department_id 部门ID
   */
  async getAllDepartmentUsers (department_id) {
    return this._getAllDepartmentUsersInfo('getUserListByDepartment', department_id)
  }
  /**
   * 获取部门的所有成员详情
   * @param {String} department_id 
   */
  async getAllDepartmentUserDetails (department_id) {
    return await this._getAllDepartmentUsersInfo('getUserDetailByDepartment', department_id)
  }
  /**
   * 获取所有成员列表
   */
  async getAllUserList () {
    const users = await this._getAllUserInfoList('getUserListByDepartment')
    return uniqBy(users, 'userid')
  }
  /**
   * 获取所有成员详情
   */
  async getAllUserDetailList () {
    const users = await this._getAllUserInfoList('getUserDetailByDepartment')
    return uniqBy(users, 'userid')
  }
  /**
   * 获取所有部门成员信息
   * @param {String} method 获取成员信息的方法
   * @param {String} department_id 部门ID
   * @param {Array} container 容器
   * @param {Number} offset 偏移量
   * @param {Number} size 每页大小
   */
  async _getAllDepartmentUsersInfo (method, department_id, container = [], offset = 0, size = 100) {
    const result = await this[method](department_id, offset, size)
    container.push(...result.userlist)
    if (result.hasMore) {
      await this._getAllDepartmentUsersInfo(method, department_id, container, offset + size, size)
    }
    return container
  }
  /**
   * 获取所有成员信息
   * @param {String} method 获取成员信息的方法
   */
  async _getAllUserInfoList (method) {
    const departments = await this.getAllDepartment()
    const users = await Promise.all(departments.map(item => this._getAllDepartmentUsersInfo(method,item.id)))
    return users.reduce((prev, cur) => prev.concat(cur), [])
  }
}

module.exports = User