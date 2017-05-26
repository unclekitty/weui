import address from './address'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return {
          address: address(Vue.http)
        }
      }
    }
  })
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }
}

export default plugin
