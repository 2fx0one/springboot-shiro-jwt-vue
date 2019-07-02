import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const permissions = store.getters && store.getters.permissions

    // console.log(value)
    // console.log(typeof value)
    // console.log(value instanceof String)
    if (value && typeof value === 'string' && value.length > 0) {
      const permission = value
      const hasPermission = permissions.includes(permission)

      // const hasPermission = roles.some(role => {
      //   return permissionRoles.includes(role)
      // })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="'admin'"`)
    }
  }
}
