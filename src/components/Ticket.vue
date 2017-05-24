<template>
  <div class="page-ticket">
    <scroller>
      <div class="wrapper">
        <group class="form-group">
          <x-input title="消费金额" type="number" keyboard="number" v-model="amount" placeholder="输入实际消费多力金额"></x-input>
        </group>
        <box gap="15px 15px">
            <div class="camera" @click="picker()">
                <img  v-if="ticketUrl" :src="ticketUrl" style="width:100%;display:block;">
                <span v-else class="placeholder">
                    <x-icon type="ios-camera" size="60"></x-icon>
                    <a>点击拍照</a>
                </span>
            </div>
            <div class="btn-wrap">
                <x-button type="warn" @click.native="submit()">提交</x-button>
            </div>
            <div class="rules">
                <div>上传小票注意事项：</div>
                <ul>
                    <li>每次拍摄一张小票，且金额>20元</li>
                </ul>
            </div>
        </box>
      </div>
    </scroller>
  </div>
</template>

<script>
import _ from 'lodash'
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
  methods: {
    picker () {
      let self = this
      let wx = this.$wechat
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success (res) {
          // res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          let localId = res.localIds[0]
          // 上传
          wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success (res) {
              self.serverId = res.serverId // 返回图片的服务器端ID
            }
          })
          // 显示
          if (navigator.userAgent.toLocaleLowerCase().indexOf('iphone') !== -1) {
            wx.getLocalImgData({
              localId: localId, // 图片的localID
              success (res) {
                let localData = res.localData // localData是图片的base64数据，可以用img标签显示
                localData = localData.replace('jgp', 'jpeg')// iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
                self.ticketUrl = localData
              },
              fail (res) {
                self.alert('显示失败')
              }
            })
          } else {
            self.ticketUrl = localId
          }
        }
      })
    },
    preview () {
      let self = this
      let wx = this.$wechat
      wx.previewImage({
        current: self.ticketUrl, // 当前显示图片的http链接
        urls: [self.ticketUrl] // 需要预览的图片http链接列表
      })
    },
    submit () {
      let self = this
      let $http = this.$http
      let $router = this.$router
      let fields = [
        'amount',
        'serverId'
      ]
      let data = _.merge({}, _.pick(self.$data, fields))
      if (!data.serverId) {
        self.alert('请先拍摄上传小票')
        return
      }
      if (!data.amount) {
        self.alert('请输入消费金额')
        return
      }
      $http.post('a/api/bill', data).then(res => {
        let response = res.body
        self.alert(response.status.info)
        if (response.status.index === '10000') {
          $router.push('ticketlist')
        }
      })
    },
    alert (message) {
      const alert = this.$vux.alert
      alert.show({
        title: '提示',
        content: message
      })
    }
  },
  data () {
    return {
      title: '',
      ticketUrl: '',
      amount: '',
      serverId: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'TicketList' && to.name === 'Ticket') {
      next('/me')
    } else {
      next()
    }
  }
}
</script>

<style lang="scss">
.page-ticket{
  .wrapper {
    overflow: hidden;
  }
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
    color: #666;
    margin-bottom: 30px;
    ul {
        list-style: none;
        padding-left: 2px;
        margin-top: 4px;
    }
    h4, ul li {
        color: #666;
        font-size: .96em
    }
    .footer {
      padding: 10px 0;
    }
  }
}
</style>
