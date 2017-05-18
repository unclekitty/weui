<template>
  <div class="page-profile">
    <group>
      <cell title="地址管理" is-link link="address"></cell>
      <cell title="修改密码" is-link link="resetpwd"></cell>
    </group>

    <group>
      <cell title="退出登录" is-link @click.native="sigout"></cell>
    </group>

  </div>
</template>

<script>
import { XInput, XButton, Group, Cell, Icon, Selector, Datetime } from 'vux'

const storage = window.localStorage

export default {
  created () {

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
      title: ''
    }
  }
}
</script>

<style lang="scss">
.page-profile{
    display: inherit;
}
</style>

