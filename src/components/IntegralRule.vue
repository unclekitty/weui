<template>
  <div class="page-ingegal-rule">
    <scroller>
      <div class="wrapper">
        <box gap="15px 15px">
          <h4>积分规则</h4>
          <div class="rules">
            <ul>
                <li>每天只可以签到一次</li>
                <li>签到一次获得3分</li>
                <li>连续签到7天，第七天获得16分</li>
                <li>连续签到30天，第30天获得53分</li>
                <li>连续签到超过100天，第100天获得303分</li>
                <li>每年12月30日清零</li>
                <li>关注多力生活家了，才能积分</li>
                <li>不关注多力生活家了，积分清零</li>
            </ul>
          </div>
        </box>
      </div>
    </scroller>
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
    margin-bottom: 15px;
    color: #666;
  }
  .rules{
      ul {
          list-style: none;
          padding-left: 2px;
          li {
            margin: 8px 0;
          }
      }
      h4, ul li {
          color: #666;
      }
  }
}
</style>

