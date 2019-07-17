import { constantRoutes } from '@/router'
import { getMenuNav } from '@/api/user'
/* Layout */
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

function menuToRouter(menu, level = 0) {
  // console.log('menuToRouter menu = ', menu)
  // console.log('menuToRouter level = ', level)
  if (menu.children && menu.children.length > 0) {
    return {
      level,
      name: menu.url,
      path: menu.url,
      component: level === 0 ? Layout : menu.url,
      meta: { title: menu.name, icon: menu.icon },
      children: menu.children.map(e => { return menuToRouter(e, level + 1) }) // 递归获取
    }
  } else {
    const name = menu.url.replace('/', '-')
    return {
      level,
      name,
      path: name,
      component: () => import(`@/views/modules/${menu.url}`),
      meta: { title: menu.name, icon: menu.icon, noCache: true }
    }
  }
}

const actions = {
  generateRoutes({ commit }, userInfo) {
    return new Promise(resolve => {
      getMenuNav().then(({ data }) => {
        // console.log('getMenuNav userInfo', userInfo)
        // console.log('getMenuNav', data)

        const accessedRoutes = data.menuList.map(x => menuToRouter(x, 0))
        console.log(accessedRoutes)
        // if (userInfo.name === 'admin') {
        //   accessedRoutes = asyncRoutes || []
        // } else {
        //   accessedRoutes = []
        // }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
