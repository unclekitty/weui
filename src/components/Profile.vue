<template>
  <div class="page-profile">
    <group class="header">
      <cell title="头像" value-align="right">
        <img slot="icon" :src="header">
      </cell>
    </group>
    <group>
      <x-input title="姓名" placeholder="张全蛋" novalidate placeholder-align="right"></x-input>
      <x-input title="真实姓名" placeholder="张全蛋" novalidate placeholder-align="right"></x-input>
      <selector title="性别" :options="sex" v-model="defaultValue"></selector>
      <datetime title="生日" v-model="now"></datetime>
      <x-input title="手机号" placeholder="188****6699" novalidate placeholder-align="right"></x-input>
      <cell title="地址管理" is-link link="address"></cell>
      <cell title="修改密码" is-link link="resetpwd"></cell>
    </group>

    <div class="footer">
        <x-button type="warn">保存</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, XButton, Group, Cell, Icon, Selector, Datetime } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Icon,
    Selector,
    Datetime
  },
  data () {
    return {
      title: '',
      header: '/static/head.jpeg',
      defaultValue: '',
      now: '2015-11-12',
      sex: [{key: '1', value: '男'}, {key: '0', value: '女'}]
    }
  }
}
</script>

<style lang="scss">
.page-profile{
  .header{
    .weui-cells{
      margin: 0;

      .weui-cell{
        flex-direction: row-reverse;
      }
      img{
        width: 64px;
        border-radius: 50%;
        border: 2px solid rgba(133, 133, 133, 0.25);
      }
    }
  }
  .footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    button {
      border-radius: 0;
    }
  }
}
</style>
