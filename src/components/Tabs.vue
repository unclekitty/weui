<template>
  <div class="page-tabs">
    <div class="tab-view">
      <navigation>
        <router-view></router-view>
      </navigation>
    </div>
    <tabbar class="tabbar" v-model="index">
      <tabbar-item link="/home">
        <icon slot="icon" type="info-circle"></icon>
        <span slot="label">微信</span>
      </tabbar-item>
      <tabbar-item link="/contact" show-dot>
        <icon slot="icon" type="info-circle"></icon>
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item link="/explore">
        <icon slot="icon" type="info-circle"></icon>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item link="/me" badge="2">
        <icon slot="icon" type="info-circle"></icon>
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .tabbar {
    display: none!important;
  }
  
}
</style>

