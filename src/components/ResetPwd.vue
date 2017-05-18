<template>
  <div class="page-address-edit">
    <group class="form">
      <x-input title="原密码" type="password" v-model="oldPassword" placeholder="请输入原密码"></x-input>
      <x-input title="新密码" type="password" v-model="password" placeholder="请输入6-20位密码" :min="6" :max="20"></x-input>
      <x-input title="确认新密码" type="password" v-model="refPassword" placeholder="请再次输入新密码确认" :equal-with="password"></x-input>
    </group>
    
    <div class="footer">
        <x-button type="warn" @click.native="reset()">保存</x-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { XInput, XButton, Group, Cell } from 'vux'

const storage = window.localStorage
const RESETTYPE = 2

export default {
  created () {
    let self = this
    let userInfo = JSON.parse(storage.getItem('userInfo'))
    _.merge(self.userInfo, userInfo)
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  methods: {
    reset () {
      const self = this
      const $http = this.$http
      const $router = this.$router
      const alert = this.$vux.alert
      let fields = [
        'mobile',
        'oldPassword',
        'password',
        'refPassword'
      ]
      let data = _.merge({
        userId: self.userInfo.id,
        resetType: RESETTYPE
      }, _.pick(self.$data, fields))
      $http.put(`a/api/reset/${self.userInfo.id}`, data).then(res => {
        let response = res.body
        alert.show({
          title: '提示',
          content: response.status.info
        })
        $router.go(-1)
      })
    }
  },
  data () {
    return {
      title: '',
      oldPassword: '',
      password: '',
      refPassword: '',
      userInfo: {}
    }
  }
}
</script>

<style lang="scss">
.page-address-edit{
    .form{
        .weui-cells{
            margin: 0;
        }
    }
  .footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    button {
      border-radius: 0;
    }
  }
}
</style>
