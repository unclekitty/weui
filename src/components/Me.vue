<template>
  <div class="page-me">
    <div class="relative">
      <div class="bg">
        <div class="wrapper">
          <router-link class="link" to="profile">
            <div class="center">
              <img src="static/head.jpeg">
            </div>
          </router-link>
          <h3 class="name">
            <router-link class="link" to="profile">张全蛋</router-link>
          </h3>
          <div class="grid-wrapper">
            <grid slot="content" :rows="2">
              <grid-item class="grid-item" link="integral">
                <span class="title">我的积分</span>
                <span>100</span>
              </grid-item>
              <grid-item class="grid-item" link="message">
                <span class="title">我的消息</span>
                <span>0</span>
              </grid-item>
            </grid>
          </div>
        </div>
      </div>
      <!---->
      <div class="panel">
        <grid slot="content" :rows="3">
          <grid-item class="grid-item" link="ticket">
            <x-icon type="ios-camera" size="40"></x-icon>
            <span class="label">拍摄小票</span>
          </grid-item>
          <grid-item class="grid-item">
            <x-icon type="ios-calendar" size="40"></x-icon>
            <span class="label">签到</span>
          </grid-item>
          <grid-item class="grid-item" link="integralRule">
            <x-icon type="ios-list" size="40"></x-icon>
            <span class="label">积分规则</span>
          </grid-item>
        </grid>
      </div>
    </div>
    <!--integral-->
    <div class="integral">
      <grid slot="content" :rows="2">
        <grid-item class="grid-item" link="integalExchangeRecord">
          <x-icon type="ios-camera" size="45"></x-icon>
          <span class="label">积分兑换纪录</span>
        </grid-item>
        <grid-item class="grid-item" link="integalExchange">
          <x-icon type="ios-camera" size="45"></x-icon>
          <span class="label">积分兑换</span>
        </grid-item>
      </grid>
    </div>

  </div>
</template>

<script>
import { Blur, Card, Group, Grid, GridItem } from 'vux'

export default {
  components: {
    Blur,
    Group,
    Card,
    Grid,
    GridItem
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      bgUrl: 'static/bg.png'
    }
  }
}
</script>

<style lang="scss">
.page-me {
  .relative{
    position: relative;
  }
  .bg{
    background-image: url(../assets/bg.png);
    height: 260px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;

    .center {
      color: #fff;
      font-size: 18px;
      margin-bottom: 10px;
      img {
        display: inherit;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid rgba(236, 236, 236, 0.25);
      }
    }

    .name{
      &, & a{
        color: #fff;
      }
    }

    .grid-wrapper{
      .weui-grids{
        &:before, &:after{
          display: none;
        }
        .grid-item{
          &:before, &:after{
            display: none;
          }
          &:nth-child(1){
            &:before{
              display: block;
              top: 30px;
              bottom: 30px;
              border-color: #fff;
              transform: scaleX(1);
            }
          }
          &:hover{
            background:none;
          }
        }
      }
      width: 100%;
    }
  }

  .grid-item{
    padding: 15px 12px;
    text-align:center;
    font-size: 12px;
    color: #333;
    .title{
      display: block;
      margin-bottom: 5px;
      color: #fff;
      font-size: 1.5em;
    }
    span {
      font-size: 1.3em;
      color: #ff9800;
    }
  }
  
  .panel, .integral{
    background: #fff;

    &.panel{
      position: absolute;
      left: 15px;
      right: 15px;
      bottom: -50px;
      border-radius: 5px;
      box-shadow: 5px 5px 15px rgba(157, 9, 6, 0.35);

      .weui-grids{
        &:before, &:after{
          display: none;
        }
        .grid-item{
          padding: 15px 12px;

          .label{
            display: block;
          }
          .vux-x-icon {
              fill: #666;
          }
          span {
            font-size: 1.2em;
            color: #999;
          }
          &:after{
            display: none;
          }
          &:nth-child(3){
            &:before{
              display: none;
            }
          }
        }
      }
    }

    &.integral{
      margin-top: 90px;

      .grid-item {
        padding: 20px 12px;
        .label{
          display: block;
        }
        .vux-x-icon {
            fill: #666;
        }
        span {
          color: #999;
        }
      }
    }
  }
}
</style>

