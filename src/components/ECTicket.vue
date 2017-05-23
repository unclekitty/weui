<template>
  <div class="page-ecticket">
    <checklist class="checklist" :options="commonList"  @on-change="change"></checklist>
    
    <group class="form">
      <x-input title="订单号" placeholder="请输入订单号"></x-input>
      <x-input title="订单金额" placeholder="请输入订单金额"></x-input>
    </group>

    <footer class="footer">
        <x-button type="warn" @click.native="submit()">提交</x-button>
    </footer>
  </div>
</template>

<script>
// import _ from 'lodash'
import { XInput, XButton, Group, Cell, Checklist } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Checklist
  },
  methods: {
    change () {

    },
    submit () {
      let self = this
      let $router = this.$router
      self.alert('商城成功后3天内完成审核')
      $router.push('ecticketlist')
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
      ticketUrl: '',
      amount: '',
      serverId: '',
      commonList: [ '天猫', '京东', '一号店' ]
    }
  }
}
</script>

<style lang="scss">
.page-ecticket{

  .checklist {
    margin: 20px 0;
    .weui-cells {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 20px 15px;

      .weui-cell {
        &:before, &:after {
          display: none;
        }
      }
    }
  }

  footer{
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
