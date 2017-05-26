<template>
  <div class="page-ticket-list">
    <scroller>
      <div class="wrapper">
        <!--spinner-->
        <div class="spinner" v-if="loading || list.length === 0">
          <div v-if="loading">
            <spinner type="lines"></spinner>
            <p>正在加载...</p>
          </div>
          <div v-else-if="list.length === 0">
            <icon type="info"></icon>
            <p>您还没有上传小票...</p>
          </div>
        </div>
        <!--/spinner-->
        <card class="card" v-for="item in list" :key="item.id">
          <div slot="header" class="header">
            <span class="title">{{item.createDate}}</span>
            <span class="primary">{{status[item.billStatus]}}</span>
          </div>
          <div slot="content" class="content">
            <span class="thumb">
              <badge v-if="item.images.length" :text="item.images.length"></badge>
              <img :src="item.images[0].imgurl">
            </span>
            <div class="body">
              <div class="title">消费金额：{{item.amount}}元</div>
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
import { Box, Card, Group, Cell, Icon, Spinner, Badge } from 'vux'
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
    Icon,
    Spinner,
    Badge
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
          list[i].images = []
          if (list[i].billFileList && list[i].billFileList.length) {
            list[i].images = list[i].billFileList
          } else {
            list[i].images.push({imgurl: list[i].imgurl})
          }
        }
        self.list = list
        self.loading = false
      })
    }
  },
  data () {
    return {
      title: '',
      list: [],
      status: {
        1: '审核通过',
        2: '审核中',
        3: '审核失败'
      },
      loading: true
    }
  }
}
</script>

<style lang="scss">
.page-ticket-list{
  .wrapper {
    overflow: hidden;
    padding: 15px;
  }
  .card{
    border-radius: 6px;
    box-shadow: 2px 2px 1px rgba(204, 204, 204, 0.51);

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
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .vux-badge {
          position: absolute;
          background: rgba(0, 0, 0, 0.6);
          right: -4px;
          top: -4px;
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
