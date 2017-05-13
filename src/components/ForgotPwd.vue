<template>
  <div class="page-forgot-pwd">
    <h2>找回密码</h2>
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
.page-forgot-pwd{

}
</style>
