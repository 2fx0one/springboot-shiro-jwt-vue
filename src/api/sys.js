import { get, post, put, del } from '@/api/base'

// // 菜单管理
export const userList = data => get(`sys/user/list?officeId=${data.officeId}&loginName=${data.loginName}&name=${data.name}`, data)
export const userAdd = data => post(`sys/user/add`, data)
export const checkLoginName = data => post(`sys/user/checkLoginName?loginName=${data.loginName}&oldLoginName=${data.oldLoginName}`, data)
export const goAdd = data => get(`sys/user/goAdd`, data)
export const deleteUser = data => get(`sys/user/doDelete?id=${data.id}`, data)
export const userModify = data => post(`sys/user//modify`, data)
export const userDetail = data => get(`sys/user/detail?id=${data.id}`, data)

// 部门管理
export const officeList = data => get('sys/office/my_offices', data)
export const officeModify = data => get(`sys/office/modify?id=${data.id}&status=${data.status}`, data)

export const roleList = data => get('sys/role/list', data)

// 字典管理
export const dictList = data => get('sys/dict/findAllList', data)

// 菜单管理
export const sysMenuView = query => get('sys/menu/view', query)
export const sysMenuAdd = data => post('sys/menu/add', data)
export const sysMenuModify = data => put('sys/menu/modify', data)
export const sysMenuDelete = data => del(`sys/menu/delete/${data.id}`, data)

// 角色管理
export const sysRoleView = query => get('sys/role/view', query)
export const sysRoleAdd = data => post('sys/role/add', data)
export const sysRoleModify = data => put('sys/role/modify', data)
export const sysRoleDelete = data => del(`sys/role/delete/${data.id}`, data)

