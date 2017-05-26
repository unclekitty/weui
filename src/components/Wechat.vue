<template>
  <div class="page-wechat">

    <box gap="15px 15px">
      <group class="form-group">
        <x-input title="手机号码" type="tel" v-model="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
      </group>
      <group class="form-group">
        <x-input title="验证码" type="text" v-model="code" class="weui-cell_vcode">
          <div class="countdown" slot="right">
            <x-button mini type="primary" :disabled="start" @click.native="getAuthCode()">
              <span v-if="start">
                重新发送<countdown slot="value" v-model="time" :start="start" @on-finish="finish"></countdown>
              </span>
              <span v-else>发送验证码</span>
            </x-button>
          </div>
        </x-input>
      </group>
      <group class="form-group">
        <x-input title="密码" type="password" placeholder="请输入密码" v-model="password" :min="6" :max="16"></x-input>
      </group>
      <div class="wp">
        <span>
          继续操作视为同意<router-link class="link" to="agreement">《用户注册协议》</router-link>
        </span>
        <span>
          <router-link to="forgotpwd">忘记密码</router-link>
        </span>
      </div>
      <div class="form-group">
        <x-button type="warn" @click.native="sigin()">立即验证</x-button>
      </div>
    </box>

  </div>
</template>

<script>
import _ from 'lodash'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { Box, Group, Cell, Icon, XInput, XButton, Countdown } from 'vux'
import { User } from '../api'

const USERTYPE = 1
const SENDTYPE = 1
const COUNT_TIME = 80
const storage = window.localStorage

const search = () => {
  let obj = {}
  location.search.replace(/[`?`&]([^=#]+)=([^&#]*)/g, ($1, $2, $3) => {
    obj[$2] = obj[$2] ? obj[$2] + ',' + $3 : $3
  })
  return obj
}

export default {
  components: {
    Box,
    Group,
    Cell,
    Icon,
    XInput,
    XButton,
    Countdown
  },
  methods: {
    finish (index) {
      let self = this
      self.start = false
      self.time = COUNT_TIME
    },
    sigin () {
      const self = this
      const router = this.$router
      let fields = [
        'mobile',
        'password',
        'code',
        'openId'
      ]
      let data = _.merge({
        userType: USERTYPE
      }, _.pick(self.$data, fields))
      if (!data.code) {
        self.alert('请输入验证码')
        return
      }
      if (!data.password) {
        self.alert('请输入密码')
        return
      }
      // 验证
      User.wxbund(data)
      .then(res => {
        storage.setItem('token', res.token)
        storage.setItem('userInfo', JSON.stringify(res.userInfo))
        router.push('me')
      })
      .catch(error => {
        self.alert.show({
          title: '提示',
          content: error.info
        })
      })
    },
    getAuthCode () {
      const self = this
      const $http = this.$http
      let fields = [
        'mobile'
      ]
      let data = _.merge({
        userType: USERTYPE,
        secret: '1i9PivUeseAuThorDL17',
        sendType: SENDTYPE
      }, _.pick(self.$data, fields))
      if (!isMobilePhone(data.mobile, 'zh-CN')) {
        self.alert('请输入正确的手机号')
        return
      }
      if (!self.start) {
        self.start = true
        $http.post(`a/api/smsAuthCode/${self.mobile}`, data, res => {})
      } else {
        self.step += 1
      }
    },
    alert (message) {
      const alert = this.$vux.alert
      alert.show({
        title: '提示',
        content: message
      })
    }
  },
  data () {
    return {
      mobile: '',
      password: '',
      code: '',
      repassword: '',
      start: false,
      time: COUNT_TIME
    }
  },
  beforeRouteEnter (to, from, next) {
    let openId = storage.getItem('openId')
    let redirect = search()['redirect'] || '/me'
    if (redirect === 'wechat') {
      redirect = true
    }
    if (openId) {
      // openId 登录
      User.wxlogin()
      .then(res => {
        storage.setItem('token', res.token)
        storage.setItem('userInfo', JSON.stringify(res.userInfo))
        next(redirect)
      })
      .catch(error => {
        console.log(error)
        next()
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss">
.page-wechat {

  .form-group{
    .weui-cells{
      &:before,&:after{
        display:none;
      }
      border-radius: 4px;
      box-shadow: 1px 1px 2px #ccc;

      .vux-x-input{
        padding: 12px 15px;
        justify-content: space-around;

        .weui-cell__hd{
          width: 30%;
        }
        .countdown{
          display:inline-block;
          position:relative;
          font-size: 14px;
          padding: 0 0 0 15px;
          &:before{
            content: '';
            position: absolute;
            width: 1px;
            height: 100%;
            left: 0;
            vertical-align: middle;
            background: #adadad;
          }
          
          button {
            padding: 0 1em;
            margin: -5px 1px;
            line-height: 2.2;
          }
        }
      }
    }
  }

 .wp{
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &, & a{
      color:#999;
    }

    .link{
      color: #E64340;
    }
  }
}
</style>

