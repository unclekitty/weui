<template>
  <div class="page-ticket-list">
    <scroller lock-x scrollbar-y>
      <div class="wrapper">
        <card class="card" v-for="item in list" :key="item.id">
          <div slot="header" class="header">
            <span class="title">{{item.createDate}}</span>
            <span class="primary">审核通过</span>
          </div>
          <div slot="content" class="content">
            <span class="thumb">
              <img :src="item.imgurl">
            </span>
            <div class="body">
              <div class="title">{{item.amount}}</div>
              <p class="sub">
                <span>{{item.auditText}}</span>
              </p>
            </div>
          </div>
        </card>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Card, Group, Cell, Icon } from 'vux'
import moment from 'moment'

export default {
  created () {
    let self = this
    self.load()
  },
  components: {
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
.page-ticket-list{
  
  .wrapper {
    overflow: hidden;
  }

  .card{
    box-shadow: 2px 2px 1px rgba(204, 204, 204, 0.51);
    margin-top: 20px;

    &:before,&:after{
      display: none;
    }

    .header{
      padding: 15px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;

      &:before {
        content: " ";
        position: absolute;
        left: 15px;
        right: 15px;
        height: 1px;
        bottom: 0;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleY(0.5);
      }
    }

    .content{
      padding: 20px 15px;
      color: #666;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .thumb{
        width: 56px;
        height: 56px;
        margin-right: 15px;
        flex-shrink: 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .body{
        width: 100%;
      }
      .title{
        margin-bottom: 5px;
      }
      .sub{
        font-size: .9em;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
