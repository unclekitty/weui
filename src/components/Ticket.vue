<template>
  <div class="page-ticket">
    <scroller>
      <div class="wrapper">
        <group class="form-group">
          <x-input title="消费金额" type="number" keyboard="number" v-model="amount" placeholder="输入实际消费多力金额"></x-input>
        </group>
        <box gap="15px 15px">
            <div class="image-box" :class="{'m': localImages.length}">
              <div class="thumb" v-for="(item, index) in localImages" :key="index">
                <img :src="item">
              </div>
              <span class="camera" @click="picker()">
                <i class="glyph-icon flaticon-photo-camera"></i>
                <a>点击拍照</a>
              </span>
            </div>
            <div class="btn-wrap">
                <x-button type="warn" @click.native="submit()">提交</x-button>
            </div>
            <div class="rules">
                <div>拍摄小票说明：</div>
                <ol>
                   <li>每次拍摄请只上传一张小票，购买多力产品金额≥20元。</li>
                   <li>积分仅限消费小票，刷卡单据无法进行积分。</li>
                   <li>每日获取积分上限为1000积分。</li>
                   <li>请保证上传的小票为本人消费，且要保证小票图像清晰、完整。</li>
                   <li>小票过长的可自上到下分拍，最多支持6张照片上传。各张照片间需体现衔接关系，既前一张照片的最后一笔记录和后一张照片的第一笔记录需一致。</li>
                   <li>小票上传截止日期为购买商品当月最后一日24:00点前，逾期小票恕无法积分。</li>
                   <li>小票审核通过后，积分将在3-5个工作日内到账，所获积分有效期为当年12月30日。</li>
                   <li>对于有消费异常的会员，我们有权怀疑是虚假消费并冻结帐户。如帐户被冻结，会员可主动致电400****** 出示消费证明以解冻帐号</li>
                   <li>有任何疑问请洽400****** 客服热线咨询</li>
                </ol>
            </div>
        </box>
      </div>
    </scroller>
  </div>
</template>

<script>
// import Vue from 'vue'
import _ from 'lodash'
import { XInput, XButton, Box, Card, Group, Cell, Icon } from 'vux'

// const wx = Vue.wechat

// function uploadImages (localIds) {
//   let promises = []
//   for (var i = 0; i < localIds.length; i++) {
//     let localId = localIds[i]
//     let promise = new Promise((resolve, reject) => {
//       wx.uploadImage({
//         localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
//         isShowProgressTips: 1, // 默认为1，显示进度提示
//         success (res) {
//           resolve(res.serverId) // 返回图片的服务器端ID
//         }
//       })
//     })
//     promises.push(promise)
//   }
//   return Promise.all(promises)
// }

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
      if (self.serverIds.length >= 6) {
        self.alert('最多支持上传6张照片')
        return
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success (res) {
          // res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          const localId = res.localIds[0]
          // 显示
          if (navigator.userAgent.toLocaleLowerCase().indexOf('iphone') !== -1) {
            wx.getLocalImgData({
              localId: localId, // 图片的localID
              success (res) {
                let localData = res.localData // localData是图片的base64数据，可以用img标签显示
                localData = localData.replace('jgp', 'jpeg')// iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
                self.localImages.push(localData)
              },
              fail (res) {
                self.alert('显示失败')
              }
            })
          } else {
            self.localImages.push(localId)
          }
          // 上传
          wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success (res) {
              // resolve(res.serverId) // 返回图片的服务器端ID
              self.serverIds.push(res.serverId)
              self.serverId = self.serverIds.join()
            }
          })
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
      localImages: [],
      amount: '',
      localIds: [],
      serverIds: [],
      serverId: '',
      count: 0
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
  .image-box {
    .thumb {
      height: 200px;
      overflow: hidden;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: auto;
      }
    }
    .camera{
        display: flex;
        background-color: #ccc;
        height: 200px;
        border-radius: 5px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .glyph-icon {
          font-size: 36px;
          color: #fff;
        }
        a{
            color: #fff;
        }
    }
    &.m {
      .camera {
        height: 54px;
        .glyph-icon {
          font-size: 18px;
        }
        a {
          font-size: 14px;
        }
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
    ol {
        padding-left: 2px;
        margin-top: 4px 0;
        padding-left: 8px;
        li {
          margin: 10px;
        }
    }
    h4, ol li {
        color: #666;
        font-size: .96em
    }
    .footer {
      padding: 10px 0;
    }
  }
}
</style>
