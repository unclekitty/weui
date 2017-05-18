<template>
  <div class="page-profile">
    <group class="header">
      <cell title="头像" value-align="right">
        <img slot="icon" :src="header">
      </cell>
    </group>
    <group class="form">
      <x-input title="姓名" placeholder="张全蛋" v-model="userInfo.nickName" novalidate></x-input>
      <x-input title="真实姓名" placeholder="张全蛋" v-model="userInfo.name" novalidate></x-input>
      <selector title="性别" :options="sex" v-model="userInfo.sex"></selector>
      <datetime title="生日" v-model="userInfo.birthday" :min-year="1970" :start-date="startDate" :end-date="endDate" confirm-text="确认" cancel-text="取消"></datetime>
      <x-input title="手机号" placeholder="188****0000" v-model="userInfo.mobile" keyboard="number" is-type="china-mobile"></x-input>
      <x-input title="电子邮箱" placeholder="请输入邮箱" v-model="userInfo.email" novalidate></x-input>
      <cell title="地址管理" is-link link="address"></cell>
      <cell title="修改密码" is-link link="resetpwd"></cell>
    </group>

    <group>
      <cell title="退出登录" is-link @click.native="sigout"></cell>
    </group>

    <div class="footer">
        <x-button type="warn" @click.native="updateInfo()">保存</x-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { XInput, XButton, Group, Cell, Icon, Selector, Datetime } from 'vux'
import moment from 'moment'

const storage = window.localStorage

export default {
  created () {
    let self = this
    let $http = this.$http
    let userInfo = JSON.parse(storage.getItem('userInfo'))
    $http.post(`a/api/user/${userInfo.id}`, {}).then(res => {
      let response = res.body
      let info = response.results
      let fields = [
        'nickName',
        'name',
        'sex',
        'birthday',
        'mobile',
        'email'
      ]
      _.merge(self.userInfo, info)
      info.dlUserInfo.birthday = moment(info.dlUserInfo.birthday).format('YYYY-MM-DD')
      _.merge(self.userInfo, _.pick(info.dlUserInfo, fields))
    })
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Icon,
    Selector,
    Datetime
  },
  methods: {
    updateInfo () {
      const self = this
      const $http = this.$http
      let fields = [
        'nickName',
        'name',
        'sex',
        'birthday',
        'mobile',
        'email'
      ]
      let data = _.merge({}, _.pick(self.userInfo, fields))
      data.birthday = moment(data.birthday).format('YYYY-MM-DD HH:mm:ss')
      $http.put(`a/api/user/${self.userInfo.id}`, data).then(res => {
        let response = res.body
        self.alert(response.status.info)
      })
    },
    sigout () {
      const $router = this.$router
      storage.clear()
      $router.replace('/')
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
      title: '',
      header: 'static/head.jpeg',
      startDate: moment(0).format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      sex: [{key: '1', value: '男'}, {key: '0', value: '女'}],
      userInfo: {
        nickName: '',
        name: '',
        sex: '',
        birthday: '',
        mobile: '',
        email: ''
      }
    }
  }
}
</script>

<style lang="scss">
.page-profile{
  .header{
    .weui-cells{
      margin: 0;

      .weui-cell{
        flex-direction: row-reverse;
      }
      img{
        width: 64px;
        border-radius: 50%;
        border: 2px solid rgba(133, 133, 133, 0.25);
      }
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
