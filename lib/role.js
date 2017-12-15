const METHOD_PREFIX = 'dingtalk.corp.role.'
class Role {
  async getRoleSimpleList (role_id, size, offset) {
    return await this._topPost(`${METHOD_PREFIX}simplelist`, {role_id, size, offset})
  }
  async getRoleList (size, offset) {
    return await this._topPost(`${METHOD_PREFIX}list`, {size, offset})
  }
  async getAllRoleList () {
    return await this._getAllRoleList()
  }
  async getRoleAllSimpleList (role_id) {
    return await this._getRoleAllSimpleList(role_id)
  }
  async addRolesForEmps (roleid_list, userid_list) {
    return await this._topPost(`${METHOD_PREFIX}addrolesforemps`, {roleid_list, userid_list})
  }
  async removeRolesForEmps (roleid_list, userid_list) {
    return await this._topPost(`${METHOD_PREFIX}removerolesforemps`, {roleid_list, userid_list})
  }
  async deleteRole (role_id) {
    return await this._topPost(`${METHOD_PREFIX}deleterole`, {role_id})
  }
  async getRoleGroup (group_id) {
    return await this._topPost(`${METHOD_PREFIX}getrolegroup`, {group_id})
  }
  async _getAllRoleList (size = 20, offset = 0, container = []) {
    const result = await this.getRoleList(size, offset)
    container.push(...result.list)
    if (result.has_more) {
      await this._getAllRoleList(size, offset + size, container)
    }
    return container
  }
  async _getRoleAllSimpleList (role_id, size = 20, offset = 0, container = []) {
    const result = await this.getRoleAllSimpleList(role_id, size, offset)
    container.push(...result.list)
    if (result.has_more) {
      await this._getRoleAllSimpleList(role_id, size, offset + size, container)
    }
    return container
  }
}