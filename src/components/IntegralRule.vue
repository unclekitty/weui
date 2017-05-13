<template>
  <div class="page-ingegal-rule">
    <box gap="15px 15px">
      <h4>积分规则</h4>
      <div class="rules">
        <ul>
            <li>积分兑换规则</li>
            <li>积分兑换规则</li>
            <li>积分兑换规则</li>
            <li>积分兑换规则</li>
            <li>积分兑换规则</li>
        </ul>
      </div>
    </box>
  </div>
</template>

<script>
import { Box, Group, Cell, Icon } from 'vux'

export default {
  components: {
    Box,
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
.page-ingegal-rule{
  h4{
    margin-bottom: 20px;
    color: #666;
  }
  .rules{
      ul {
          list-style: none;
          padding-left: 2px;
      }
      h4, ul li {
          color: #666;
      }
  }
}
</style>

