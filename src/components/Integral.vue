<template>
  <div class="page-ingegal">
    <div class="ingegal">
      <div class="grid" :rows="3">
        <div class="grid-item">
          <span class="label">我的积分：</span>
        </div>
        <div class="grid-item center">
          <span class="label">{{integral}}</span>
        </div>
        <div class="grid-item right">
          <span class="label">积分兑换说明</span>
        </div>
      </div>
    </div>

    <div class="swiper">
      <tab :line-width="1" custom-bar-width="60px" v-model="index">
          <tab-item active-class="active" v-for="(tab, index) in tabs" :key="index">{{tab}}</tab-item>
      </tab>
      <swiper v-model="index" :height="height" :show-dots="false">
        <swiper-item v-for="(tab, index) in tabs" :key="index">
          <div class="tab-swiper vux-center">
            <!--LIST-->
            <div class="list">
              <div class="item" v-for="(item, index) in list" :key="index">
                <span class="title">{{item.createDate}}</span>
                <span class="content">{{dict[item.integralType]}}</span>
                <span class="label primary" v-if="item.recordType==1">+{{item.integral}}</span>
                <span class="label warn" v-else>-{{item.integral}}</span>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Group, Grid, GridItem, Cell, Icon, Tab, TabItem, Swiper, SwiperItem } from 'vux'

const storage = window.localStorage

export default {
  created () {
    let self = this
    let userInfo = JSON.parse(storage.getItem('userInfo'))
    self.integral = userInfo.dlUserAccount.integral
    self.load()
  },
  components: {
    Group,
    Grid,
    GridItem,
    Cell,
    Icon,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  methods: {
    load () {
      let self = this
      let $http = this.$http
      let fields = [
        'integralType',
        'recordType'
      ]
      let data = {}
      _.merge(data, _.pick(self.$data, fields))
      if (data.integralType === 0) {
        delete data.integralType
      }
      if (data.recordType === 2) {
        delete data.integralType
      } else {
        delete data.recordType
      }
      $http.post(`a/api/integralLog/list`, data).then(res => {
        let response = res.body
        let list = response.results.list
        self.list = list
      })
    },
    change (index, old) {
      let self = this
      self.integralType = parseInt(index)
      if (self.integralType === 5) {
        self.recordType = 2
      } else {
        self.recordType = 1
      }
      self.load()
    },
    height () {
      return `${this.list.length * 55}px`
    }
  },
  computed: {
    height: () => {
      if (this.list) {
        return `${this.list.length * 55}px`
      } else {
        return '800px'
      }
    }
  },
  data () {
    return {
      title: '',
      index: 0,
      integral: 0,
      tabs: {
        0: '全部',
        1: '小票积分', // 小票
        2: '签到积分',
        3: '电商积分',
        // 4: '积分兑换'
        5: '积分兑换'
      },
      dict: {
        1: '小票积分',
        2: '签到积分',
        3: '电商积分',
        4: '抽奖'
      },
      type: {
        1: '收入',
        2: '支出'
      },
      list: [],
      integralType: 0,
      recordType: 1
    }
  },
  watch: {
    'index': 'change'
  }
}
</script>

<style lang="scss">
.page-ingegal{
  .center{
    text-align: center;
  }
  .right{
    text-align: right;
  }
  .ingegal {
    background: #E64340;
    font-size: 1.2em;
    padding: 0 15px;
    .grid{
      display: flex;
      align-items: center;
      justify-content: space-between;

      .grid-item{
        padding: 20px 0;
        color: #fff;

        &.center{
          font-size: 1.4em;
        }
        &.right{
          padding: 15px 0;
          margin-top: -35px;
          font-size: 14px;
          .help {
            display: inline-block;
            width: 13px;
            height: 13px;
            line-height: 13px;
            font-size: 10px;
            text-align: center;
            border: 1px solid #fff;
            border-radius: 50%;
          }
        }
        .label {
          color: #fff;
        }
      }
    }
  }

  .active {
    color: #E64340 !important;
    border-color: #E64340 !important;
  }
  .vux-tab-bar-inner{
    background: #E64340 !important;
  }

  .swiper{
    background: #fff;
    .weui-cells{
      margin: 0;
    }
    .vux-swiper{

    }
  }
  .list {
    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      position: relative;
      color: #333;

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
  }
}
</style>

