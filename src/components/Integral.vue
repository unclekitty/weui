<template>
  <div class="page-ingegal">
    <div class="ingegal">
      <div class="grid" :rows="3">
        <div class="grid-item">
          <span class="label">我的积分：</span>
        </div>
        <div class="grid-item center">
          <span class="label">{{userInfo.dlUserAccount.integral}}</span>
        </div>
        <div class="grid-item right">
          <router-link class="label" to="integralUseDescription">积分兑换说明</router-link>
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
            <!--spinner-->
            <div class="spinner" v-if="loading || list.length === 0">
              <div v-if="loading">
                <spinner type="lines"></spinner>
                <p>正在加载...</p>
              </div>
              <div v-else-if="list.length === 0">
                <icon type="info"></icon>
                <p v-if="index===0">您还没有积分记录...</p>
                <p v-else>您还没有{{tab}}记录...</p>
              </div>
            </div>
            <!--/spinner-->
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
import { Group, Grid, GridItem, Cell, Icon, Tab, TabItem, Swiper, SwiperItem, Spinner } from 'vux'
import { mapState } from 'vuex'
import { Integral } from '../api'

// const storage = window.localStorage

export default {
  created () {
    let self = this
    // let userInfo = JSON.parse(storage.getItem('userInfo'))
    // self.integral = userInfo.dlUserAccount.integral
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
    SwiperItem,
    Spinner
  },
  methods: {
    load () {
      let self = this
      let data = {}
      let fields = [
        'integralType',
        'recordType'
      ]
      _.merge(data, _.pick(self.$data, fields))
      Integral.query(data)
      .then(res => {
        self.list = res.list
        self.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    onChange (index, old) {
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
    },
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data () {
    return {
      title: '',
      index: 0,
      // integral: 0,
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
      recordType: 1,
      loading: true
    }
  },
  watch: {
    'index': 'onChange'
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
          a {
            color: #fff;
          }
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
  }
  .list {
    .item{
      display: flex;
      align-items: center;
      justify-content: flex-start;
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
      span {
        flex-basis: 35%;
        &:first-child {
          flex: 1;
          flex-basis: 60%;
        }
        &:last-child {
          flex-basis: 15%;
        }
      }
    }
  }
}
</style>

