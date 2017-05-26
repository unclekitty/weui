<template>
  <div class="page-ingegal-rule">
    <scroller>
      <div class="wrapper">
        <box gap="15px 15px">
          <h4>积分规则</h4>
          <div class="rules">
            <section>
              <p class="no">1</p>
              <p class="title">购买多力产品1元=1积分</p>
              <p>超市购买扫描小票，电商购买，获取积分等于消费金额取整</p>
            </section>
            <section>
              <p class="no">2</p>
              <p class="title">签到积分</p>
              <p>当日签到积分+3，连续签到7天，第七天可获得+16, 连续签到30天第三十天可获得+53，连续签到100天第一百天可获得+303</p>
              <p>（举例，连续七天签到=34分，30天=192， 100天等于919分）</p>
            </section>
            <section>
              <p class="no">3</p>
              <p class="title">特别说明</p>
              <p>如退货，相应的所得积分将被取消</p>
              <p>取消关注多力生活家，积分将被清零</p>
              <p>每年12月30日积分清零，请会员及时进行积分兑换</p>
            </section>
            <section>
              <p>以上规则, 最终解释权归多力生活家所有</p>
            </section>
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
    color: #333;
    text-align: center;
  }
  .rules{
    section {
      margin: 18px 0;
      text-align: center;
      &:last-child {
        margin: 30px 0;
      }
      p {
        color: #333;
        font-size: .9em;
        line-height: 1.5;
      }
      .title {
        color: #333;
        text-decoration: underline;
        margin: 10px 0;
      }
    }
  }
}
</style>

