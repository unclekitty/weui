<template>
  <div class="page-contact">
    <group title="cell demo">
      <cell is-link :title="item.name" v-for="item in list" :key="item.id">
        <icon class="icon" slot="icon" type="warn" is-msg></icon>
        <span slot="value">{{item.sex}}</span>
        <span slot="inline-desc">hello!</span>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Icon } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Icon
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      list: [
        {
          id: 1,
          name: 'Kitty',
          sex: '女'
        },
        {
          id: 2,
          name: 'Kitty',
          sex: '女'
        },
        {
          id: 3,
          name: 'Kitty',
          sex: '女'
        },
        {
          id: 4,
          name: 'Kitty',
          sex: '女'
        },
        {
          id: 5,
          name: 'Kitty',
          sex: '女'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.page-contact{
  
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
  .icon{
    font-size: 45px;
    margin-right: 15px;
  }
}
</style>
