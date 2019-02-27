import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param pathList
 * @param route
 */
function hasPermission(pathList, route) {
  if (route.path) {
    return pathList.some(p => route.path.includes(p))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param pathList
 */
function filterAsyncRouter(routes, pathList) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(pathList, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, pathList)
      }
      res.push(tmp)
    }
  })

  return res
}

function filterChildren(children, pathList) {
  const accessChildren = children.filter(child => {
    const r = pathList.filter(path => path === child.path)
    // console.log(r)
    if (r.length !== 0) {
      return true
    } else {
      return false
    }
  })
  return accessChildren
}

function filterAsyncRouterWithPathTree(asyncRouterMap, pathList) {
  const accessedRouters = asyncRouterMap.filter(route => {
    // 只过滤子节点 只有两级节点
    // 如果子节点不为空 就表示该节点可用
    // if (childrenHasPermissionOfPathList(pathList, route)) {
    if (route.children && route.children.length) {
      route.children = filterChildren(route.children, pathList)
      if (route.children.length !== 0) {
        return true
      }
    }
    // }
    return false
  })

  return accessedRouters
}

const permission = {
  state: {
    routers: [],
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
        const { pathList } = data
        // console.log(permissionList)
        let accessedRouters
        if (pathList.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          console.log(pathList)
          // accessedRouters = filterAsyncRouter(asyncRouterMap, pathList)
          // const pathList = permissionList.map(e => {
          //   return e.perm
          // }).filter(e => e)
          // console.log(asyncRouterMap)
          accessedRouters = filterAsyncRouterWithPathTree(asyncRouterMap, pathList)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
