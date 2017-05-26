<template>
  <div class="page-ecticket-list">
    <scroller lock-x scrollbar-y>
      <div class="wrapper">
          <!--spinner-->
          <div class="spinner" v-if="loading || list.length === 0">
            <div v-if="loading">
              <spinner type="lines"></spinner>
              <p>正在加载...</p>
            </div>
            <div v-else-if="list.length === 0">
              <icon type="info"></icon>
              <p>您还没有电商兑换记录...</p>
            </div>
          </div>
          <!--/spinner-->
        <card class="card" v-for="item in list" :key="item.id">
          <div slot="header" class="header">
            <span class="title">{{item.createDate}}</span>
            <span class="primary">审核通过</span>
          </div>
          <div slot="content" class="content">
            <div class="fields">
              <div class="item">
                <span>电商平台：</span>
                <span>{{ecommerce[item.etyep]}}</span>
              </div>
              <div class="item">
                <span>订单编号：</span>
                <span>{{item.orderNumber}}</span>
              </div>
              <div class="item">
                <span>订单金额：</span>
                <span>{{item.amount}}元</span>
              </div>
            </div>
          </div>
          <div slot="footer" class="footer">
            <div>审核通过，积分<span class="warn">+20</span></div>
            <div class="align-right"></div>
          </div>
        </card>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Box, Card, Group, Cell, Icon, Spinner } from 'vux'
import { EcTicket } from '../api'

export default {
  created () {
    let self = this
    self.load()
  },
  components: {
    Box,
    Card,
    Group,
    Cell,
    Icon,
    Spinner
  },
  methods: {
    load () {
      let self = this
      EcTicket.query()
      .then(res => {
        setTimeout(() => {
          self.list = res.list
          self.loading = false
        }, 1000)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  data () {
    return {
      title: '',
      list: [],
      ecommerce: {
        1: '天猫',
        2: '京东',
        3: '一号店'
      },
      loading: true
    }
  }
}
</script>

<style lang="scss">
.page-ecticket-list{
  .wrapper {
    overflow: hidden;
  }
  
  .card{
    margin-top: 20px;
    box-shadow: 2px 2px 1px rgba(204, 204, 204, 0.51);

    &:before,&:after{
      display: none;
    }

    .header, .footer{
      padding: 15px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;

      &:before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 0;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleY(0.5);
      }
      &.footer{
        &:before{
          top: 0;
          bottom: auto;
        }
        .align-right{
          text-align: right;
          font-size: .9em;
        }
      }
    }

    .content{
      padding: 15px 15px;
      color: #333;
      .fields {

        .item {
          margin: 5px 0;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
