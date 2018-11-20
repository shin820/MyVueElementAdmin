import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    id: 0,
    projectId: 0,
    projectCategory: 0,
    organizationId: 0,
    organizationType: 0,
    unitId: 0,
    unitCategory: 0,
    unitName: '',
    status: '',
    token: getToken(),
    name: '',
    account: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    permissions: []
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_PROJECT_ID: (state, id) => {
      state.projectId = id
    },
    SET_PROJECT_CATEGORY: (state, category) => {
      state.projectCategory = category
    },
    SET_ORGANIZATION_ID: (state, id) => {
      state.organizationId = id
    },
    SET_ORGANIZATION_TYPE: (state, projectCategory) => {
      if (projectCategory === 1) {
        state.organizationType = 1 // 集团
      } else if (projectCategory === 2) {
        state.organizationType = 2 // 分公司
      } else if (projectCategory === 0) {
        state.organizationType = 3 // 项目
      }
    },
    SET_UNIT_ID: (state, id) => {
      state.unitId = id
    },
    SET_UNIT_CATEGORY: (state, category) => {
      state.unitCategory = category
    },
    SET_UNIT_NAME: (state, name) => {
      state.unitName = name
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permission) => {
      state.permissions = permission
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            console.dir(response)
            const data = response.data
            commit('SET_TOKEN', data.accessToken)
            setToken(data.accessToken)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    LoginByToken({ commit }, token) {
      commit('SET_TOKEN', token)
      setToken(token)
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            if (!response.data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error')
            }
            const data = response.data

            response.data.roles = ['admin']
            commit('SET_ROLES', ['admin'])
            // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            //   commit('SET_ROLES', data.roles)

            // } else {
            //   reject('getInfo: roles must be a non-null array !')
            // }

            commit('SET_ID', data.id)
            commit('SET_NAME', data.userName)
            commit('SET_ACCOUNT', data.name)
            commit('SET_PROJECT_ID', data.projectId)
            commit('SET_PROJECT_CATEGORY', data.projectCategory)
            commit('SET_ORGANIZATION_ID', data.projectId)
            commit('SET_ORGANIZATION_TYPE', data.projectCategory)
            commit('SET_UNIT_ID', data.unitId)
            commit('SET_UNIT_CATEGORY', data.unitCategory)
            commit('SET_UNIT_NAME', data.unitName)
            commit('SET_AVATAR', data.avatar)
            commit('SET_INTRODUCTION', data.introduction)
            commit('SET_PERMISSIONS', data.supervisionPermissions)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_ID', 0)
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_ID', 0)
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

    // // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
