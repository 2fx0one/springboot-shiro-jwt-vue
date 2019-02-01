import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/sys/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/sys/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/sys/auth/user/info',
    method: 'get',
    params: { token }
  })
}

