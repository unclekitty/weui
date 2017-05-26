<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
      <transition :name="`navigation-${{forward: 'in', back: 'out'}[direction]}`">
        <navigation>
          <router-view class="router-view"></router-view>
        </navigation>
      </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      direction: state => state.navigation.direction
    })
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~flat-icon/css/flaticon.css';
  
  html,body {
    height: 100%;
    background-color: #fbf9fe;
    color: #333;
  }
  a {
    color: #333;
  }
  .primary{
    color: #1AAD19;
  }
  .warn{
    color: #E64340;
  }
  .danger{
    color: #ff9800;
  }
  .blue{
    color: #0e08ee;
  }
  .weui-btn_danger {
    background: #ff9800;
  }
  #app, [class^=page-]{
    height: 100%;
  }
  .glyph-icon {
    &:before{
      font-size: inherit;
      margin: 0;
    }
  }

  .router-view {
    width: 100%;
  }

  .navigation-in-enter-active,.navigation-in-leave-active,.navigation-out-enter-active,.navigation-out-leave-active {
    will-change: transform;
    -webkit-transition: all .5s;
    transition: all .5s;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    perspective: 1000
  }

  .navigation-out-enter {
    opacity: 0;
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
  }

  .navigation-in-enter,.navigation-out-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
  }

  .navigation-in-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
  }
  .form{
      .weui-cells{
          margin: 0;
          .weui-cell{
            .weui-cell__hd{
              width: 30%;
            }
          }
      }
  }
  .spinner {
    text-align: center;
    padding: 40px 0;
    p {
      color: #666;
      margin-top: 10px;
    }
  }
</style>
