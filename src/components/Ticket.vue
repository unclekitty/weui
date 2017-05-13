<template>
  <div class="page-message">
    <group class="form-group">
      <x-input title="消费金额" placeholder="输入实际消费多力金额"></x-input>
    </group>
    <box gap="15px 15px">
        <div class="camera">
            <img  v-if="ticketUrl" src="http://placeholder.qiniudn.com/640x400" style="width:100%;display:block;">
            <span v-else class="placeholder">
                <x-icon type="ios-camera" size="60"></x-icon>
                <a>点击拍照</a>
            </span>
        </div>
        <div class="btn-wrap">
            <x-button type="warn">提交</x-button>
        </div>
        <div class="rules">
            <h4>上传小票注意事项：</h4>
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
import { XInput, XButton, Box, Card, Group, Cell, Icon } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Box,
    Card,
    Group,
    Cell,
    Icon
  },
  data () {
    return {
      title: '',
      ticketUrl: ''
    }
  }
}
</script>

<style lang="scss">
.page-message {
    .camera {
        .placeholder{
            display: flex;
            background-color: #ccc;
            height: 200px;
            border-radius: 5px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .vux-x-icon {
                fill: #fff;
            }
            a{
                color: #fff;
            }
        }
    }
    .btn-wrap {
        padding: 15px 0;
    }
    .card-padding {
        padding: 15px;
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
