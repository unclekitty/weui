<template>
  <div class="page-address-edit">
    <group class="form">
      <x-input title="原密码" type="password" placeholder="请输入原密码" placeholder-align="right"></x-input>
      <x-input title="新密码" type="password" placeholder="请输入7-20位密码" v-model="password" :min="7" :max="20"></x-input>
      <x-input title="确认新密码" v-model="repassword" type="text" placeholder="请再次输入新密码确认" :equal-with="password"></x-input>
    </group>
    
    <div class="footer">
        <x-button type="warn">保存</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, XButton, Group, Cell } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data () {
    return {
      title: '',
      password: '',
      repassword: ''
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
