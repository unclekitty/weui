<template>
  <div class="page-ingegal-use-desc">
    <box gap="15px 15px">
      <h4>积分商城规则</h4>
      <div class="rules">
        <section>
          <p class="no">1</p>
          <p class="title">开放时间</p>
          <p>积分商城于2017年6月开启。</p>
        </section>
        <section>
          <p class="no">2</p>
          <p class="title">兑换规则</p>
          <p>每位会员兑换同一商品最多2个，允许一次兑换多个不同商品。</p>
        </section>
        <section>
          <p class="no">3</p>
          <p class="title">领取规则</p>
          <p>会员需提供真实地址，兑换商品将在订单生成后的3-5个工作日寄送会员设置的默认收货地</p>
        </section>
        <section>
          <p class="no">4</p>
          <p class="title">特别说明</p>
          <p>已完成兑换的商品，无法取消。</p>
          <p>积分商品兑换条件及限制将在积分商品详情页展示。</p>
          <p>各品类商品库存有限，兑完即止。</p>
          <p>为防止恶意刷单，兑换订单将由专人进行审核。</p>
        </section>
        <section>
          <p>以上规则, 最终解释权归多力生活家所有</p>
        </section>
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
.page-ingegal-use-desc{
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

