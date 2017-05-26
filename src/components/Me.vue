<template>
  <div class="page-me">
    <scroller>
      <div class="content">
        <div class="relative">
          <div class="bg" style="background-image: url(static/bg.jpg);">
            <div class="wrapper">
              <div class="face">
                <a class="link left">&nbsp;</a>
                <router-link class="link center" to="profile">
                  <img :src="userInfo.headimgurl">
                </router-link>
                <router-link class="link right" to="settings">
                  <i class="glyph-icon flaticon-settings-5"></i>
                </router-link>
              </div>
              <h3 class="name">
                <router-link class="link" to="profile">{{userInfo.nickName}}</router-link>
              </h3>
              <div class="grid-wrapper">
                <grid slot="content" :rows="2">
                  <grid-item class="grid-item" link="integral">
                    <span class="title">我的积分</span>
                    <span>{{userInfo.dlUserAccount.integral}}</span>
                  </grid-item>
                  <grid-item class="grid-item" link="message">
                    <span class="title">我的消息</span>
                    <span>{{userInfo.msgCount}}</span>
                  </grid-item>
                </grid>
              </div>
            </div>
          </div>
          <!---->
          <div class="panel">
            <grid slot="content" :rows="3">
              <grid-item class="grid-item" link="ticket">
                <i class="glyph-icon flaticon-photo-camera"></i>
                <span class="label">拍摄小票</span>
              </grid-item>
              <grid-item class="grid-item" :class="{'no-sign': !userInfo.isSign}" @click.native="sign()">
                <i class="glyph-icon flaticon-calendar-7"></i>
                <span class="label" v-if="userInfo.isSign">已签到</span>
                <span class="label" v-else>签到</span>
              </grid-item>
              <grid-item class="grid-item" link="ecticket">
                <i class="glyph-icon flaticon-bookmark"></i>
                <span class="label">电商积分</span>
              </grid-item>
            </grid>
          </div>
        </div>
        <!--integral-->
        <div class="integral">
          <grid slot="content" :rows="3">
            <grid-item class="grid-item" link="ticketlist">
              <i class="glyph-icon flaticon-calendar-2 blue"></i>
              <span class="label">小票上传记录</span>
            </grid-item>
            <grid-item class="grid-item" link="ecticketlist">
              <i class="glyph-icon flaticon-file-1 danger"></i>
              <span class="label">电商上传记录</span>
            </grid-item>
            <grid-item class="grid-item" link="order">
              <i class="glyph-icon flaticon-gift warn"></i>
              <span class="label">我的订单</span>
            </grid-item>
            <grid-item class="grid-item" link="address">
              <i class="glyph-icon flaticon-list warn"></i>
              <span class="label">地址管理</span>
            </grid-item>
            <grid-item class="grid-item" link="integralRule">
              <i class="glyph-icon flaticon-notepad primary"></i>
              <span class="label">积分规则</span>
            </grid-item>
            <grid-item class="grid-item" link="settings">
              <i class="glyph-icon flaticon-settings-5"></i>
              <span class="label">设置</span>
            </grid-item>
          </grid>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import _ from 'lodash'
import { Blur, Card, Group, Grid, GridItem } from 'vux'
import { mapState } from 'vuex'
import { User } from '../api'

const storage = window.localStorage

export default {
  created () {
    let self = this
    self.loadInfo()
  },
  components: {
    Blur,
    Group,
    Card,
    Grid,
    GridItem
  },
  methods: {
    loadInfo () {
      let self = this
      let $store = this.$store
      let userInfo = JSON.parse(storage.getItem('userInfo'))
      User.info(userInfo.id)
      .then(info => {
        _.merge(self.userInfo, info)
        $store.commit('user:update', {userInfo: self.userInfo, updated: false})
        storage.setItem('userInfo', JSON.stringify(self.userInfo))
      })
      .catch(error => {
        console.log(error)
      })
    },
    onUpdate (val, old) {
      let self = this
      if (val) {
        self.loadInfo()
      }
    },
    sign () {
      let self = this
      let $http = this.$http
      $http.post(`a/api/onsign`, {}).then(res => {
        let resData = res.body
        self.alert(resData.status.info)
        if (resData.status.index === '10000') {
          self.loadInfo()
        }
      })
    },
    alert (message) {
      const alert = this.$vux.alert
      alert.show({
        title: '提示',
        content: message
      })
    }
  },
  computed: {
    ...mapState({
      updated: state => state.user.updated
    })
  },
  data () {
    return {
      bg: {
        backgroundImage: `url(static/bg.png);`
      },
      msg: 'Hello World!',
      bgUrl: 'static/bg.png',
      userInfo: {
        nickName: '',
        name: '',
        sex: '',
        birthday: '',
        mobile: '',
        email: '',
        isSign: true,
        msgCount: 0,
        headimgurl: 'static/head.jpeg',
        dlUserAccount: {}
      }
    }
  },
  watch: {
    'updated': 'onUpdate'
  }
}
</script>

<style lang="scss">
@import '~include-media/dist/_include-media.scss';
$breakpoints: (phone: 320px, tablet: 768px, desktop: 1024px);

.page-me {
  .content {
    overflow: hidden
  }
  
  .relative{
    position: relative;
    .bg{
      height: 260px;
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px;

        .face {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          color: #333;
          font-size: 18px;
          margin-bottom: 10px;

          .link{
            flex: 1;
            display: block;
            &.center {
              text-align: center;
            }
            &.right {
              text-align: right;
              font-size: 28px;
              color: #fff;
            }
            img {
              width: 60px;
              height: 60px;
              vertical-align: middle;
              border-radius: 50%;
              border: 2px solid rgba(236, 236, 236, 0.25);
            }
          }
        }

        .name{
          &, & a{
            color: #333;
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
                  border-color: #333;
                  transform: scaleX(1);
                }
              }
              &:hover{
                background:none;
              }
              .title{
                color: #333;
              }
              span {
                color: #d72800;
              }
            }
          }
          width: 100%;
        }
      }
    }

    @include media("<=phone") {
      .bg {
        height: 230px;
      }
    }
  }

  .grid-item{
    padding: 15px 12px;
    text-align:center;
    font-size: 12px;
    .title{
      display: block;
      margin-bottom: 5px;
      color: #fff;
      font-size: 1.5em;
    }
    span {
      font-size: 1.3em;
    }
    @include media("<=phone") {
      .title {
        font-size: 1em;
      }
      span {
        font-size: 1em;
      }
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
          color: #666;

          .label{
            display: block;
          }
          .glyph-icon {
              font-size: 32px;
          }
          span {
            font-size: 1.2em;
          }
          &.no-sign{
            background: #ff0000;
            span {
              color: #fff;
            }
            .glyph-icon {
              color: #fff;
            }
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

      @include media("<=phone") {
        bottom: -45px;

        .weui-grids{
          .grid-item{
            .glyph-icon {
              font-size: 28px;
            }
            span {
              font-size: 1em;
            }
          }
        }
      }
    }

    &.integral{
      margin-top: 90px;

      .grid-item {
        color: #666;
        padding: 20px 12px;

        .label{
          display: block;
        }
        .glyph-icon {
          font-size: 40px;
        }
      }
      
      @include media("<=phone") {
        margin-top: 80px;
        .grid-item {
          padding: 15px 10px;

          .glyph-icon {
            font-size: 32px;
          }
        }
      }
    }
  }
}
</style>

