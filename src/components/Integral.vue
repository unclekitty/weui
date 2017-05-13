<template>
  <div class="page-ingegal">
    <div class="ingegal">
      <div class="grid" :rows="3">
        <div class="grid-item">
          <span class="label">我的积分：</span>
        </div>
        <div class="grid-item center">
          <span class="label">3200</span>
        </div>
        <div class="grid-item right">
          <span class="label">积分兑换说明</span>
        </div>
      </div>
    </div>

    <div class="swiper">
      <tab :line-width="1" custom-bar-width="60px" v-model="index">
          <tab-item active-class="active" v-for="(item, index) in list2" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" :height="'600px'" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">
            <!--LIST-->
            <div class="list">
              <div class="item" v-for="(item, index) in list2" :key="index">
                <span class="title">2017-5-5 8:00</span>
                <span class="content">小票兑换</span>
                <span class="label warn">-200</span>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Group, Grid, GridItem, Cell, Icon, Tab, TabItem, Swiper, SwiperItem } from 'vux'
const list = () => ['全部', '实体店积分', '签到积分', '积分兑换']

export default {
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
  computed: {
    height: () => {
      return `${list.length * 55}px`
    }
  },
  data () {
    return {
      title: '',
      index: 0,
      list2: list()
    }
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

