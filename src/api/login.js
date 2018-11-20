import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    userNameOrEmailAddress: username,
    password
  }
  return request({
    url: '/api/TokenAuth/Token',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/services/app/User/GetMe',
    method: 'get'
    // params: { token }
  })
}

