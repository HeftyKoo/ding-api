const METHOD_PREFIX = 'dingtalk.corp.role.'
class Role {
  /**
   * 获取角色的员工列表
   * @param {Number} role_id 角色ID
   * @param {Number} size 分页大小 默认值是20
   * @param {Number} offset 分页偏移，默认值是0
   */
  async getRoleSimpleList (role_id, size, offset) {
    return await this._topPost(`${METHOD_PREFIX}simplelist`, {role_id, size, offset})
  }
  /**
   * 获取企业角色列表
   * @param {Number} size 分页大小 默认值是20
   * @param {Number} offset 分页偏移，默认值是0
   */
  async getRoleList (size, offset) {
    return await this._topPost(`${METHOD_PREFIX}list`, {size, offset})
  }
  /**
   * 获取所有的角色列表
   */
  async getAllRoleList () {
    return await this._getAllRoleList()
  }
  /**
   * 获取所有的角色员工列表
   * @param {Number} role_id 
   */
  async getRoleAllSimpleList (role_id) {
    return await this._getRoleAllSimpleList(role_id)
  }
  /**
   * 批量为员工增加角色信息
   * @param {Array} roleid_list 角色id list，最长20
   * @param {Array} userid_list 员工id list，最长100
   */
  async addRolesForEmps (roleid_list, userid_list) {
    return await this._topPost(`${METHOD_PREFIX}addrolesforemps`, {roleid_list, userid_list})
  }
  /**
   * 批量删除员工角的色信息
   * @param {Array} roleid_list 角色标签id，最长20
   * @param {Array} userid_list 用户userId，最长100
   */
  async removeRolesForEmps (roleid_list, userid_list) {
    return await this._topPost(`${METHOD_PREFIX}removerolesforemps`, {roleid_list, userid_list})
  }
  /**
   * 删除角色信息
   * @param {Number} role_id 角色id
   */
  async deleteRole (role_id) {
    return await this._topPost(`${METHOD_PREFIX}deleterole`, {role_id})
  }
  /**
   * 获取角色组信息
   * @param {Number} group_id 角色组id
   */
  async getRoleGroup (group_id) {
    return await this._topPost(`${METHOD_PREFIX}getrolegroup`, {group_id})
  }
  /**
   * 获取所有的角色列表
   * @param {Number} size 分页大小 默认值是20
   * @param {Number} offset 分页偏移，默认值是0
   * @param {Array} container 结果容器
   */
  async _getAllRoleList (size = 20, offset = 0, container = []) {
    const result = await this.getRoleList(size, offset)
    container.push(...result.list)
    if (result.has_more === 'true') {
      await this._getAllRoleList(size, offset + size, container)
    }
    return container
  }
  /**
   * 获取角色的员工列表
   * @param {Number} role_id 角色id
   * @param {Number} size  分页大小 默认值是20
   * @param {Number} offset 分页偏移，默认值是0
   * @param {Array} container 结果容器
   */
  async _getRoleAllSimpleList (role_id, size = 20, offset = 0, container = []) {
    const result = await this.getRoleSimpleList(role_id, size, offset)
    container.push(...result.list)
    if (result.has_more === 'false') {
      await this._getRoleAllSimpleList(role_id, size, offset + size, container)
    }
    return container
  }
}

module.exports = Role