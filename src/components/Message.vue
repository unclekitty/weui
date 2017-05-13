<template>
  <div class="page-message">
    <box gap="15px 15px">
      <card class="card" v-for="item in list" :key="item.id">
        <div slot="header" class="header">
          <span class="title">2017-5-12 8:00</span>
          <span class="primary">小票审核通过</span>
        </div>
        <p slot="content" class="content">小票兑换成功+20积分，目前积分520分</p>
      </card>
    </box>
  </div>
</template>

<script>
import { Box, Card, Group, Cell, Icon } from 'vux'

export default {
  components: {
    Box,
    Card,
    Group,
    Cell,
    Icon
  },
  data () {
    return {
      title: '',
      list: [{
        id: 1,
        date: '2017-5-12 8:00',
        status: '小票审核通过',
        content: '小票兑换成功+20积分，目前积分520分'
      },
      {
        id: 2,
        date: '2017-5-12 8:00',
        status: '小票审核通过',
        content: '小票兑换成功+20积分，目前积分520分'
      },
      {
        id: 3,
        date: '2017-5-12 8:00',
        status: '小票审核通过',
        content: '小票兑换成功+20积分，目前积分520分'
      },
      {
        id: 4,
        date: '2017-5-12 8:00',
        status: '小票审核通过',
        content: '小票兑换成功+20积分，目前积分520分'
      }]
    }
  }
}
</script>

<style lang="scss">
.page-message{

  .card{
    border-radius: 6px;
    box-shadow: 2px 2px 1px rgba(204, 204, 204, 0.51);

    &:before,&:after{
      display: none;
    }

    .header{
      padding: 15px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;

      &:before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 0;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleY(0.5);
      }
    }
    .content{
      padding: 20px 15px;
      color: #666;
    }
  }
}
</style>
