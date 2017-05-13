<template>
  <div class="page-address-edit">
    <group class="form">
      <x-input title="联系人" placeholder="请输入联系人姓名" novalidate placeholder-align="right"></x-input>
      <x-input title="联系电话" placeholder="请输入联系电话" novalidate placeholder-align="right"></x-input>
      <x-address title="所在区域" v-model="area" raw-value :list="addressData" value-text-align="left"></x-address>
      <x-input title="详细地址" placeholder="请输入详细地址" novalidate placeholder-align="right"></x-input>
      <x-input title="邮政编码" placeholder="请输入邮政编码" novalidate placeholder-align="right"></x-input>
      <x-input title="电子邮箱" placeholder="请输入邮箱" novalidate placeholder-align="right"></x-input>
    </group>

    <group>
        <x-switch title="默认地址" v-model="isDefault"></x-switch>
    </group>
    <div class="footer">
        <x-button type="warn">保存</x-button>
    </div>
  </div>
</template>

<script>
import { XAddress, XInput, XButton, XSwitch, ChinaAddressV3Data, Group, Cell, Icon, Selector, Datetime } from 'vux'

export default {
  components: {
    XAddress,
    XInput,
    XButton,
    XSwitch,
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
      sex: [{key: '1', value: '男'}, {key: '0', value: '女'}],
      isDefault: false,
      area: [],
      addressData: ChinaAddressV3Data
    }
  }
}
</script>

<style lang="scss">
.page-address-edit{
    .form{
        .weui-cells{
            margin: 0;
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
