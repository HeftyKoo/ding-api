class Department {
  /**
   * 获取指定id的部门列表
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.z1WZXo&treeId=385&articleId=106817&docType=1#s1
   * @param {String} id 父部门id
   * @param {String} [lang] 通讯录语言(默认zh_CN另外支持en_US)
   */
  async getDepartmentListById (id, lang) {
    return await this._get('/department/list', {id, lang})
  }
  /**
   * 获取部门详情
   * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.z1WZXo&treeId=385&articleId=106817&docType=1#s2
   * @param {String} id 部门id
   * @param {String} [lang] 通讯录语言(默认zh_CN另外支持en_US)
   */
  async getDepartmentDetailById (id, lang) {
    return await this._get('/department/get', {id, lang})
  }
  /**
   * 获取所有部门列表
   * @param {String | Array} [seal] 上级ID，可以指定一组，如果不指定，从权限中获取
   */
  async getAllDepartment (seal) {
    const parents = seal ? [].concat(seal) : (await this.getAuthScope()).auth_org_scopes.authed_dept || []
    const result = await Promise.all(parents.map(id => {
      return this.getDepartmentListById(id)
        .then(result => {
          return result.department
        })
    }))
    return result.reduce((prev, cur) => prev.concat(cur), [])
  }
  /**
   * 获取所有部门详情
   * @param {String | Array} [seal] 上级ID，可以指定一组，如果不指定，从权限中获取
   */
  async getAllDepartmentDetail (seal) {
    const departments = await this.getAllDepartment(seal)
    return await Promise.all(departments.map(department => this.getDepartmentDetailById(department.id)))
  }
}

module.exports = Department