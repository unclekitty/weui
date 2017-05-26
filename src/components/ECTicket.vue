<template>
  <div class="page-ecticket">
    <div class="checklist">
      <div class="weui-cells weui-cells_checkbox">
        <template v-for="(key, value) in ecommerce">
          <label class="weui-cell weui-check__label">
            <div class="weui-cell__hd">
              <input type="radio" class="weui-check" name="ecType" :value="value" v-model="ecType"/>
                <i class="weui-icon-checked"></i>
              </div>
              <div class="weui-cell__bd">
                <p>{{key}}</p>
              </div>
          </label>
        </template>
      </div>
    </div>

    <group class="form">
      <x-input title="订单号" placeholder="请输入订单号" v-model="orderNumber"></x-input>
      <x-input title="订单金额" placeholder="请输入订单金额" v-model="amount"></x-input>
    </group>

    <footer class="footer">
        <x-button type="warn" @click.native="submit()">提交</x-button>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'
import { XInput, XButton, Group, Cell } from 'vux'
import { EcTicket } from '../api'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  methods: {
    change (value) {

    },
    submit () {
      let self = this
      let $router = this.$router
      let fields = [
        'ecType',
        'orderNumber',
        'amount'
      ]
      let data = _.merge({}, _.pick(self.$data, fields))
      console.log(data)
      EcTicket.commit(data).then(res => {
        self.alert(res.info)
        $router.push('ecticketlist')
      })
      .catch(error => {
        self.alert(error.info)
      })
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
      ecommerce: {
        1: '天猫',
        2: '京东',
        3: '一号店'
      },
      orderNumber: '',
      ecType: 1
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'ECTicketList' && to.name === 'ECTicket') {
      next('/me')
    } else {
      next()
    }
  }
}
</script>

<style lang="scss">
@import '~include-media/dist/_include-media.scss';

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
        padding: 10px 0;
        &:before, &:after {
          display: none;
        }
      }
    }
    @include media("<=phone") {
      .weui-cells {
        padding: 20px 10px;
        .weui-cell {
          padding: 10px 0px;
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
