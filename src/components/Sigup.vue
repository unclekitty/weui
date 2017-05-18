<template>
  <div class="page-sigup">
     <box gap="15px 15px">
      <section v-if="step==0">
        <group class="form-group">
          <x-input title="手机号码" placeholder="请输入手机号码" v-model="mobile" keyboard="number" is-type="china-mobile"></x-input>
        </group>
        <group class="form-group">
          <x-input title="验证码" type="text" v-model="code" class="weui-cell_vcode">
            <div class="countdown" slot="right" v-if="start">
              重新发送（<countdown slot="value" v-model="time" :start="start" @on-finish="finish"></countdown>)
            </div>
          </x-input>
        </group>
        <div class="wp">
          <span>
            继续操作视为同意<router-link class="link" to="sigup">《用户注册协议》</router-link>
          </span>
        </div>
        <div class="form-group">
          <x-button type="warn" @click.native="getAuthCode()">
            <span v-if="start==true">验证</span>
            <span v-else>获取验证码</span>
          </x-button>
        </div>
      </section>
      <section v-if="step==1">
        <group class="form-group">
          <x-input title="密码" type="password" placeholder="请输入密码" v-model="password" :min="6" :max="6"></x-input>
        </group>
        <group class="form-group">
          <x-input title="确认密码" v-model="repassword" type="password" placeholder="请确认密码" :equal-with="password"></x-input>
        </group>
        <div class="wp">
          <span>
            继续操作视为同意<router-link class="link" to="sigup">《用户注册协议》</router-link>
          </span>
        </div>
        <div class="form-group">
          <x-button type="warn" @click.native="sigup()">注册</x-button>
        </div>
      </section>

    </box>
  </div>
</template>

<script>
import _ from 'lodash'
import { Box, Group, Cell, Icon, XInput, XButton, Countdown } from 'vux'
const COUNT_TIME = 80
const USERTYPE = 1
const SENDTYPE = 1

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
    next () {
      let self = this
      if (!self.start) {
        self.start = true
      } else {
        self.step += 1
      }
    },
    finish (index) {
      let self = this
      self.start = false
      self.time = COUNT_TIME
    },
    sigup () {
      const self = this
      const $http = this.$http
      const router = this.$router
      let fields = [
        'mobile',
        'code',
        'password'
      ]
      let data = _.merge({
        userType: USERTYPE
      }, _.pick(self.$data, fields))
      $http.post('a/api/regist', data).then(res => {
        let response = res.body
        if (response.status.index === '10000') {
          router.push('sigin')
        } else {
          alert.show({
            title: '提示',
            content: response.status.info
          })
        }
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
      if (!self.start) {
        self.start = true
        $http.post(`a/api/smsAuthCode/${self.mobile}`, data, res => {})
      } else {
        self.step += 1
      }
    }
  },
  data () {
    return {
      mobile: '',
      password: '',
      code: '',
      repassword: '',
      step: 0,
      time: COUNT_TIME,
      start: false
    }
  }
}
</script>

<style lang="scss">
.page-sigup{
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
      }
    }
  }
  .wp{
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &, & a{
      color:#999;
    }

    .link{
      color: #E64340;
    }
  }
  .countdown{
    display:inline-block;
    position:relative;
    padding-left: 15px;
    font-size: 14px;

    &:before{
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      left: 0;
      vertical-align: middle;
      background: #adadad;
    }
  }
}
</style>
