<template>
  <div class="page-ingegal-exchange">
    <group class="address">
      <cell title="选择收获地址" disabled is-link></cell>
      <div class="address-info">
        <div class="row">
          <span>收件人：张全蛋</span>
          <span>18688990088</span>
        </div>
        <div class="row">
          <span>收件地址：上海市浦东新区东方路880号</span>
        </div>
      </div>
    </group>

    <card class="card">
      <div slot="header" class="header">
        <span class="title">多力集团</span>
      </div>
      <div slot="content" class="content">
        <span class="thumb">
          <img src="../assets/bg.png">
        </span>
        <div class="body">
          <div class="title">皇帝碗</div>
          <p class="sub">
            <span>积分300</span>
            <span>x1</span>
          </p>
        </div>
      </div>
      <div slot="footer" class="footer">
        <div></div>
        <!--<x-number :value="0" :min="0"></x-number>-->
        <div class="align-right">
          <p>共计1件商品 合计：<span class="warn">300积分</span></p>
          <p>持有积分：<span class="primary">3200</span></p>
        </div>
      </div>
    </card>
    
    <div class="footer">
        <x-button type="warn">保存</x-button>
    </div>
  </div>
</template>

<script>
import { XNumber, XButton, Card, Group, Cell, Icon } from 'vux'

export default {
  components: {
    XNumber,
    XButton,
    Card,
    Group,
    Cell,
    Icon
  },
  data () {
    return {
      title: ''
    }
  }
}
</script>

<style lang="scss">
.page-ingegal-exchange{
  .address{
    .weui-cells{
      margin: 0;
    }
    .address-info{
      padding: 15px;
      font-size: .9em;
      position: relative;
      color: #333;

      &:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleY(0.5);
      }

      .row{
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .card{
    border-radius: 6px;

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
      color: #666;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .thumb{
        width: 80px;
        height: 80px;
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
        font-size: 1.3em;
        margin-bottom: 15px;
      }
      .sub{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    button {
      border-radius: 0;
    }
  }
}
</style>

