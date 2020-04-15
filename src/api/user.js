import request from '@/utils/request'

export function login(data) {
  return request({
    // url: `/oauth/token?username=${data.username}&password=${data.password}&grant_type=${data.grant_type}&scope=${data.scope}&client_id=${data.client_id}&client_secret=${data.client_secret}`,
    url: `/oauth/token`,
    method: 'get',
    params: data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/sys/user/info',
    method: 'get',
    params: { token }
  })
}

export function getMenuNav() {
  return request({
    url: '/sys/menu/nav',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
