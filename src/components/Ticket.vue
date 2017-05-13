<template>
  <div class="page-message">
    <group class="form-group">
      <x-input title="消费金额" placeholder="输入实际消费多力金额"></x-input>
    </group>
    <box gap="15px 15px">
        <div class="camera" @click="picker()">
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
import Vue from 'vue'
import { XInput, XButton, Box, Card, Group, Cell, Icon } from 'vux'

let wx = Vue.wechat
// wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: '', // 必填，公众号的唯一标识
//     timestamp: , // 必填，生成签名的时间戳
//     nonceStr: '', // 必填，生成签名的随机串
//     signature: '',// 必填，签名，见附录1
//     jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// })

wx.ready(() => {

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
})

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
  methods: {
    picker () {
      let self = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          self.ticketUrl = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      })
    }
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
