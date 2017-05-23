<template>
  <div class="page-ecticket-list">
    <scroller lock-x scrollbar-y>
      <div class="wrapper">
        <card class="card" v-for="item in list" :key="item.id">
          <div slot="header" class="header">
            <span class="title">{{item.createDate}}</span>
            <span class="primary">审核通过</span>
          </div>
          <div slot="content" class="content">
            <div class="fields">
              <div class="item">
                <span>电商平台：</span>
                <span>天猫</span>
              </div>
              <div class="item">
                <span>订单编号：</span>
                <span>20170920323232432</span>
              </div>
              <div class="item">
                <span>订单金额：</span>
                <span>320积分</span>
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
import { Box, Card, Group, Cell, Icon } from 'vux'
import moment from 'moment'

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
    Icon
  },
  methods: {
    load () {
      let self = this
      let $http = this.$http
      $http.post(`a/api /bill/list`, {}).then(res => {
        let response = res.body
        let list = response.results.list
        for (let i = 0; i < list.length; i++) {
          list[i].createDate = moment(list[i].createDate).format('YYYY-MM-DD HH:mm')
        }
        self.list = list
      })
    }
  },
  data () {
    return {
      title: '',
      list: []
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
