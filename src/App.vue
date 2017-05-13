<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <navigation>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view"></router-view>
      </transition>
    </navigation>
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
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    })
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  html,body {
    height: 100%;
    background-color: #fbf9fe;
  }
  .primary{
    color: #1AAD19;
  }
  .warn{
    color: #E64340;
  }
  
  #app, [class^=page-]{
    height: 100%;
  }
  .router-view {
    width: 100%;
  }

  .vux-pop-in-enter-active,.vux-pop-in-leave-active,.vux-pop-out-enter-active,.vux-pop-out-leave-active {
    will-change: transform;
    -webkit-transition: all .5s;
    transition: all .5s;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    perspective: 1000
  }

  .vux-pop-out-enter {
    opacity: 0;
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
  }

  .vux-pop-in-enter,.vux-pop-out-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
  }
</style>
