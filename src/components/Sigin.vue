<template>
  <div class="page-sigin">

    <box gap="15px 15px">
      <group class="form-group">
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
      </group>
      <group class="form-group">
        <x-input title="密码" type="password" placeholder="不小于6位" v-model="password" :min="6" :max="6"></x-input>
      </group>
      <div class="wp">
        <span>
          <router-link to="forgotpwd">忘记密码</router-link>
        </span>
        <span>
          还没有账号<router-link class="link" to="sigup">注册</router-link></a>
        </span>
      </div>
      <div class="form-group">
        <x-button type="warn">登录</x-button>
      </div>
    </box>

  </div>
</template>

<script>
import { Box, Group, Cell, Icon, XInput, XButton } from 'vux'

export default {
  components: {
    Box,
    Group,
    Cell,
    Icon,
    XInput,
    XButton
  },
  data () {
    return {
      password: ''
    }
  }
}
</script>

<style lang="scss">
.page-sigin {
  .form-group{
    .weui-cells{
      &:before,&:after{
        display:none;
      }
      border-radius: 4px;
      box-shadow: 1px 1px 2px #ccc;

      .vux-x-input{
        padding: 12px 15px;
        justify-content: space-around;

        .weui-cell__hd{
          width: 30%;
        }
      }
    }
  }
 .wp{
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &, & a{
      color:#999;
    }

    .link{
      color: #E64340;
    }
  }
}
</style>

