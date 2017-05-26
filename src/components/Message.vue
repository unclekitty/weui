<template>
  <div class="page-message">
    <div class="content">
      <scroller>
        <box gap="15px 15px">
          <!--spinner-->
          <div class="spinner" v-if="loading || list.length === 0">
            <div v-if="loading">
              <spinner type="lines"></spinner>
              <p>正在加载...</p>
            </div>
            <div v-else-if="list.length === 0">
              <icon type="info"></icon>
              <p>您还没收到消息...</p>
            </div>
          </div>
          <!--/spinner-->
          <card class="card" v-for="item in list" :key="item.id">
            <div slot="header" class="header">
              <span class="title">{{item.createDate}}</span>
              <span class="primary">{{item.msg.title}}</span>
            </div>
            <p slot="content" class="content">{{item.msg.content}}</p>
          </card>
        </box>
      </scroller>
    </div>
  </div>
</template>

<script>
import { Box, Card, Group, Cell, Icon, Spinner } from 'vux'

export default {
  created () {
    let self = this
    self.show = true
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
      let $http = this.$http
      $http.post(`a/api/msgDetail/list`, {}).then(res => {
        let response = res.body
        let list = response.results.list
        setTimeout(() => {
          self.list = list
          self.loading = false
        }, 1000)
      })
    }
  },
  computed: {
    show: () => {
      return this.loading || this.list.length === 0
    }
  },
  data () {
    return {
      title: '',
      list: [],
      loading: true
    }
  }
}
</script>

<style lang="scss">
.page-message{
  .content {
    position: relative;
    height: 100%;
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
        left: 0;
        right: 0;
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
    }
  }
}
</style>
