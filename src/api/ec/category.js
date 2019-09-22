import request from '@/utils/request'

export function getCategoryList(params) {
  return request({
    url: '/ec/category/list',
    method: 'get',
    params
  })
}

export function getCategoryInfo(id) {
  return request({
    url: `/ec/category/info/${id}`,
    method: 'get'
  })
}

export function updateCategory(data) {
  return request({
    url: '/ec/category/update',
    method: 'put',
    data
  })
}

export function saveCategory(data) {
  return request({
    url: '/ec/category/save',
    method: 'post',
    data: data
  })
}

export function delCategory(data) {
  return request({
    url: `/ec/category/delete`,
    method: 'delete',
    data
  })
}
