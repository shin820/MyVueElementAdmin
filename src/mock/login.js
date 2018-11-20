// import {
//   param2Obj
// } from '@/utils'

const admin = {
  id: 1,
  projectId: 1,
  projectCategory: 1,
  unitId: 1,
  unitCategory: 1,
  unitName: 'testUnit',
  account: 'admin',
  userName: 'Super Admin',
  roles: ['admin'],
  introduction: '我是超级管理员',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}

export default {
  loginByUsername: config => {
    return {
      result: {
        accessToken: 'test_token'
      }
    }
  },
  getUserInfo: config => {
    // const {
    //   token
    // } = param2Obj(config.url)
    return {
      result: admin
    }
  },
  logout: () => 'success'
}
