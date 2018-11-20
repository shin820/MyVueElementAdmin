import { asyncRouterMap, constantRouterMap } from '@/router'
// import { deepClone } from '@/utils'

/**
 * 通过路由的name判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(permissions, route) {
  var isGranted = permissions.some(permission => permission === route.name)
  if (!isGranted && route.children && route.children.length) {
    // 子路由是否匹配权限
    return route.children.some(childRoute =>
      hasPermission(permissions, childRoute)
    )
  }

  return isGranted
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, permissions) {
  asyncRouterMap.forEach(route => {
    if (!hasPermission(permissions, route)) {
      route.hidden = true
    }
    if (route.children && route.children.length) {
      filterAsyncRouter(route.children, permissions)
    }
  })
  // const accessedRouters = asyncRouterMap.filter(route => {
  //   if (hasPermission(permissions, route)) {
  //     if (route.children && route.children.length) {
  //       route.children = filterAsyncRouter(route.children, permissions)
  //     }
  //     return true
  //   }
  //   return false
  // })
  // return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions } = data
        var routes = asyncRouterMap
        var usePermission = false
        if (usePermission) {
          filterAsyncRouter(routes, permissions)
        }
        commit('SET_ROUTERS', routes)
        resolve()
      })
    }
  }
}

export default permission
