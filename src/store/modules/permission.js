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

function menuToRouter(menu) {
  // console.log('menuToRouter', menu)
  if (menu.children) {
    return {
      path: menu.url,
      component: Layout,
      meta: { title: menu.name, icon: menu.icon },
      children: menu.children.map(menuToRouter)
    }
  } else {
    // menu.url = menu.url.replace(/^\//, '')
    console.log('component ', `@/views/modules/${menu.url}`)
    return {
      path: menu.url.replace('/', '-'),
      component: () => import(`@/views/modules/${menu.url}`),
      meta: { title: menu.name, icon: menu.icon, noCache: true }
    }
  }
}

const actions = {
  generateRoutes({ commit }, userInfo) {
    return new Promise(resolve => {
      getMenuNav().then(({ data }) => {
        console.log('getMenuNav userInfo', userInfo)
        console.log('getMenuNav', data)

        const accessedRoutes = data.menuList.map(menuToRouter)
        // console.log(accessedRoutes)
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
