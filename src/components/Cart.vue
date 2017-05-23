<template>
  <div class="page-cart">
    <card class="card">
      <div slot="header" class="header">
        <div class="weui-cells weui-cells_checkbox">
          <label class="weui-cell weui-check__label">
            <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check" name="isdefault"/>
                <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
                <p class="title">多力集团</p>
            </div>
          </label>
        </div>
      </div>

      <div slot="content" class="content">
        <div class="cart-item" v-for="item in list" :key="item.id">
          <div class="weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label">
              <div class="weui-cell__hd">
                  <input type="checkbox" class="weui-check" name="isdefault"/>
                  <i class="weui-icon-checked"></i>
              </div>
            </label>
          </div>
          <span class="thumb">
            <img src="../assets/bg.png">
          </span>
          <div class="body">
            <div class="title">皇帝碗</div>
            <p class="sub">
              <span>积分300</span>
              <x-number class="number" :value="0" :min="0"></x-number>
            </p>
          </div>
        </div><!--cart-item-->
      </div>
      <div slot="footer" class="footer">
        <div></div>
        <div class="align-right">
          <p>共计1件商品 合计：<span class="warn">300积分</span></p>
          <p>持有积分：<span class="primary">3200</span></p>
        </div>
      </div>
    </card>

    <footer>
      <div class="weui-cells weui-cells_checkbox">
        <label class="weui-cell weui-check__label">
          <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check" name="isdefault"/>
              <i class="weui-icon-checked"></i>
          </div>
          <div class="weui-cell__bd">
              <p>全选</p>
          </div>
        </label>
      </div>
      <div class="info">
        <div>合计:<span class="warn">¥100</span></div>
        <div>已优惠0</div>
      </div>
      <x-button type="warn" @click.native="go()">结算</x-button>
    </footer>
  </div>
</template>

<script>
import { Checklist, XNumber, XButton, Card, Group, Cell, Icon } from 'vux'

export default {
  components: {
    Checklist,
    XNumber,
    XButton,
    Card,
    Group,
    Cell,
    Icon
  },
  methods: {
    go () {
      let $router = this.$router
      $router.push('balance')
    }
  },
  data () {
    return {
      msg: 'Hello World!',
      list: [{}, {}]
    }
  }
}
</script>

<style lang="scss">
.page-cart{
  .card{
    border-radius: 6px;

    .header, .footer{
      padding: 15px 10px;
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
      padding: 0 10px;
      color: #666;

      .cart-item{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 15px 0;

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
          flex: 1;
        }
        .title{
          font-size: 1.2em;
          margin-bottom: 15px;
        }
        .sub{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .number{
            padding: 0;
            &:before{
              display: none;
            }
            .vux-number-selector-plus{
              margin: 0;
            }
          }
        }

        &:before {
          content: " ";
          position: absolute;
          left: 80px;
          right: 0;
          height: 1px;
          bottom: 0;
          border-bottom: 1px solid #D9D9D9;
          color: #D9D9D9;
          transform-origin: 100% 0;
          transform: scaleY(0.5);
        }
        &:last-child:before{
          display: none;
        }
      }

      .weui-cells_checkbox {
        margin: 0;
        width: 40px;
        background: inherit;

        &::before, &:after{
          display: none;
        }
        .weui-cell{
          padding: 0;
          &:before, &:after{
            display: none;
          }
          .weui-cell__hd{
            padding: 0;
          }
        }
      }
    }
  }

  footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    background: #fff;
    color: #666;
    box-shadow: -1px -1px 2px #ccc;

    .weui-cells_checkbox {
      width: 120px;
      .weui-cell{
        padding: 0 10px;
      }
    }

    .info {
      flex: 1;
      font-size: 0.8em;
      text-align: right;
      padding: 1px 10px;
      color: #666;
    }

    button {
      width: 100px;
      border-radius: 0;
    }
  }

  .weui-cells_checkbox {
    margin: 0;
    background: inherit;

    &::before, &:after{
      display: none;
    }
    .weui-cell{
      padding: 0;
      background: inherit;

      &::before, &:after{
        display: none!important;
      }
    }
  }
}
</style>
