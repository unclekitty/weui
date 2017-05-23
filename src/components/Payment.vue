<template>
  <div class="page-payment">
    <group class="header">
      <cell title="订单号D20170010010" value="200积分"></cell>
    </group>

    <group>
      <checklist label-position="left" :options="commonList" @on-change="change"></checklist>
    </group>

    <group class="footer">
        <x-button type="warn" @click.native="go()">提交</x-button>
    </group>
  </div>
</template>

<script>
// import _ from 'lodash'
import { XButton, Group, Cell, Checklist } from 'vux'
// import moment from 'moment'

// const storage = window.localStorage

export default {
  created () {

  },
  components: {
    XButton,
    Group,
    Cell,
    Checklist
  },
  methods: {
    change () {

    },
    go () {
      let $router = this.$router
      $router.push('order')
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
      commonList: [ '积分支付' ]
    }
  }
}
</script>

<style lang="scss">
.page-payment{
  .header {
    .weui-cells {
      margin: 0;
      padding: 20px 15px;
    }
  }
  .footer {
    margin-top: 40px;
    padding: 15px;
  }
}
</style>
