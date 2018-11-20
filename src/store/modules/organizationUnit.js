import {
  getOrganizationUnitTree
} from '@/api/organizationUnit'

import moment from 'moment'

const organizationUnit = {
  state: {
    organizationUnitTree: [],
    nextFetchTime: null
  },
  mutations: {
    SET_NEXT_FETCH_TIME: (state, time) => {
      state.nextFetchTime = time
    },
    SET_ORGANIZATION_UNIT_TREE: (state, treeData) => {
      state.organizationUnitTree = treeData
    }
  },
  actions: {
    getOrganizationUnitTree({
      commit,
      state
    }, params) {
      /* 组织架构树的数据缓存10分钟 */
      if (state.organizationUnitTree && state.organizationUnitTree.length > 0 && state.nextFetchTime > moment()) {
        return new Promise((resolve, reject) => {
          resolve(state.organizationUnitTree)
        })
      }

      return new Promise((resolve, reject) => {
        getOrganizationUnitTree(params)
          .then(response => {
            commit('SET_ORGANIZATION_UNIT_TREE', response.data)
            commit('SET_NEXT_FETCH_TIME', moment().add(10, 'minutes'))
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default organizationUnit
