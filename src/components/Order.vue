<template>
  <div class="page-ingegal-order">
    <scroller>
      <group class="list">
        <template v-for="(item, index) in list2">
          <div class="head">
            <span class="date">2017-5-5 8:00</span>
            <span class="primary">兑换成功</span>
          </div>
          <div class="content">
            <span class="thumb">
              <img src="../assets/bg.png">
            </span>
            <div class="body">
              <div class="title">
                <span>皇帝碗</span>
                <span>x1</span>
              </div>
            </div>
          </div>
          <cell value="1件商品，共计320积分" is-link link="orderdetail/01"></cell>
        </template>
      </group>
    </scroller>
  </div>
</template>

<script>
import { Group, Cell, Icon } from 'vux'

const list = () => ['全部', '实体店积分', '签到积分', '积分兑换']

export default {
  components: {
    Group,
    Cell,
    Icon
  },
  data () {
    return {
      title: '',
      list2: list()
    }
  }
}
</script>

<style lang="scss">
.page-ingegal-order{
  .list{
    .head{
      padding: 15px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content{
      position: relative;
      padding: 15px 15px;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .thumb{
        width: 64px;
        height: 64px;
        margin-right: 15px;
        flex-shrink: 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      
      .body{
        width: 100%;
        .title{
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }

      &:before, &:after {
        content: " ";
        position: absolute;
        left: 15px;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleY(0.5);
      }
      &:before {
        top: 0;
      }
      &:after {
        bottom: 0;
      }
    }

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
      border-color:#999!important;
      margin-top: -8px;
    }
  }
}
</style>
