import request from '@/utils/request'

export function getDeptList(params) {
  return request({
    url: '/sys/dept/list',
    method: 'get',
    params
  })
}

export function getDeptInfo(id) {
  return request({
    url: `/sys/dept/info/${id}`,
    method: 'get'
  })
}

export function updateDept(data) {
  return request({
    url: '/sys/dept/update',
    method: 'put',
    data
  })
}

export function saveDept(data) {
  return request({
    url: '/sys/dept/save',
    method: 'post',
    data: data
  })
}

export function delDept(data) {
  return request({
    url: `/sys/dept/delete`,
    method: 'delete',
    data
  })
}
