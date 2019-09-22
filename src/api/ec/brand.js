import request from '@/utils/request'

export function getBrandList(params) {
  return request({
    url: '/ec/brand/list',
    method: 'get',
    params
  })
}

export function getBrandInfo(id) {
  return request({
    url: `/ec/brand/info/${id}`,
    method: 'get'
  })
}

export function updateBrand(data) {
  return request({
    url: '/ec/brand/update',
    method: 'put',
    data
  })
}

export function saveBrand(data) {
  return request({
    url: '/ec/brand/save',
    method: 'post',
    data: data
  })
}

export function delBrand(data) {
  return request({
    url: `/ec/brand/delete`,
    method: 'delete',
    data
  })
}
