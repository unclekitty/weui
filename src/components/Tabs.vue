<template>
  <div class="page-tabs">
    <div class="tab-view">
      <navigation>
        <router-view></router-view>
      </navigation>
    </div>
    <tabbar class="tabbar" v-model="index">
      <tabbar-item class="tabbar-item" link="/home">
        <i slot="icon" class="weui-icon weui-icon-* glyph-icon flaticon-home-1"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item class="tabbar-item" link="/category" show-dot>
        <i slot="icon" class="weui-icon weui-icon-* glyph-icon flaticon-list-1"></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <!--
      <tabbar-item class="tabbar-item" link="/explore">
        <i slot="icon" class="weui-icon weui-icon-* glyph-icon flaticon-navigation"></i>
        <span slot="label">发现</span>
      </tabbar-item>
      -->
      <tabbar-item class="tabbar-item" link="/cart">
        <i slot="icon" class="weui-icon weui-icon-* glyph-icon flaticon-gift"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item class="tabbar-item" link="/me" badge="2">
        <i slot="icon" class="weui-icon weui-icon-* glyph-icon flaticon-user"></i>
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Icon } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    Icon
  },
  data () {
    return {
      index: 0
    }
  }
}
</script>

<style lang="scss">
.page-tabs {

  .tab-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
  }

  .tabbar {
    max-height: 50px;

    .tabbar-item{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  
}
</style>

