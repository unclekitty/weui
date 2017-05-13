// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import { sync } from 'vuex-router-sync'
import Vuex from 'vuex'
import { AlertPlugin, ConfirmPlugin, WechatPlugin } from 'vux'
import Navigation from 'vue-navigation'

Vue.use(Vuex)
// store
const store = new Vuex.Store({
  modules: {
    vux: {
      state: {
        demoScrollTop: 0,
        isLoading: false,
        direction: 'forward'
      },
      mutations: {
        updateDirection (state, payload) {
          state.direction = payload.direction
        }
      }
    }
  }
})

Vue.use(Navigation, {router, store})
// Vue.use(store)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(require('vue-wechat-title'))
Vue.use(WechatPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  console.log(to)
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
