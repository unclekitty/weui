<template>
  <div class="page-ingegal-exchange-record">
    <!--spinner-->
    <div class="spinner" v-if="loading || list.length === 0">
      <div v-if="loading">
        <spinner type="lines"></spinner>
        <p>正在加载...</p>
      </div>
      <div v-else-if="list.length === 0">
        <icon type="info"></icon>
        <p>您还没有兑换过礼品...</p>
      </div>
    </div>
    <!--/spinner-->
    <group class="list" v-if="list.length">
      <template v-for="(item, index) in list">
        <div class="head">
          <span class="date">2017-5-5 8:00</span>
          <span class="warn">-200</span>
        </div>
        <cell title="兑换物品：皇帝碗" is-link link="integalExchangeDetail/01"></cell>
      </template>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Icon, Spinner } from 'vux'

const list = () => ['全部', '实体店积分', '签到积分', '积分兑换']

export default {
  created () {
    let self = this
    setTimeout(() => {
      self.list = list
      self.loading = false
    }, 1000)
  },
  components: {
    Group,
    Cell,
    Icon,
    Spinner
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
.page-ingegal-exchange-record{
  .head{
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list{
    .weui-cells{
      margin: 0;
    }
    .weui-cell{
      color: #333;

      &:before{
        bottom: 0!important;
        top: auto;
        left: 0px;
      }
      &:last-child:before{
        display: none;
      }
    }
    .weui-cell_access .weui-cell__ft:after {
      height: 12px;
      width: 12px;
      border-color:#333;
      margin-top: -8px;
    }
  }
}
</style>
