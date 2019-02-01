import { get, post } from '@/api/base'

// 菜单管理
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

// 角色管理
export const roleList = data => get('sys/role/list', data)

// 字典管理
export const dictList = data => get('sys/dict/findAllList', data)

// 菜单管理
export const menuList = data => get('sys/menu/my_menu', data)
