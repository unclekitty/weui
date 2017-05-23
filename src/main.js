// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import Vuex from 'vuex'
import { AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin } from 'vux'
import Navigation from 'vue-navigation'
import VueResource from 'vue-resource'
// import CryptoJS from 'crypto-js'
import VueScroller from 'vue-scroller'
import VueAwesomeSwiper from 'vue-awesome-swiper'

const storage = window.localStorage

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
    },
    address: {
      state: {
        data: {}
      },
      mutations: {
        selected (state, payload) {
          state.data = payload.data
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
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(VueResource)
Vue.use(VueScroller)
Vue.use(VueAwesomeSwiper)

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.http.options.root = 'http://duo.authorc.com/duoli'
// Vue.http.options.root = 'http://10.21.32.99:8080/duoli'
Vue.http.headers.common['name'] = 'duoli'
Vue.http.interceptors.push((request, next) => {
  const token = storage.getItem('token') || ''
  const userInfo = JSON.parse(storage.getItem('userInfo'))
  const $router = Vue.router
  if (request.body) {
    request.body['userId'] = userInfo ? userInfo.id : ''
    request.body['token'] = token
  } else {
    request.body = {
      token: token,
      userId: userInfo ? userInfo.id : ''
    }
  }
  next(response => {
    if (response.status === 401 || response.status === 403 || response.body.status.index === '40001') {
      storage.clear()
      $router.replace('/')
    }
  })
})

/* wx jssdk */
const http = Vue.http
let wx = Vue.wechat

http.post('a/weixin/api/getAuth', {url: `${location.origin}${location.pathname}`}).then(res => {
  console.log(res)
  let results = res.body.results
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: results.appId, // 必填，公众号的唯一标识
    timestamp: results.timestamp, // 必填，生成签名的时间戳
    nonceStr: results.nonceStr, // 必填，生成签名的随机串
    signature: results.signature, // 必填，签名，见附录1
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard',
      'getLocalImgData'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
})

wx.ready(() => {
  // wx.hideMenuItems({
  //   menuList: [
  //     'menuItem:share:appMessage',
  //     'menuItem:share:timeline'
  //   ]
  // })
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
