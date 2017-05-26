<template>
  <div class="page-address-edit">
    <group class="form">
      <x-input title="联系人" placeholder="请输入联系人姓名(必填)" v-model="name"></x-input>
      <x-input title="联系电话" placeholder="请输入联系人手机号(必填)" v-model="mobile" keyboard="number" is-type="china-mobile"></x-input>
      <x-address title="所在区域" placeholder="请选择地址(必填)" v-model="area" raw-value :list="addressData" value-text-align="left"></x-address>
      <x-input title="详细地址" placeholder="请输入详细地址(必填)" v-model="detailed"></x-input>
      <x-input title="邮政编码" placeholder="请输入邮政编码" v-model="zipcode" type="tel" keyboard="number" :min="6" :max="6"></x-input>
    </group>

    <group v-if="!isNaN(id)">
        <x-switch title="默认地址" v-model="isDefault"></x-switch>
    </group>
    <div class="footer">
        <x-button type="warn" @click.native="submit()">保存</x-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { XAddress, XInput, XButton, XSwitch, ChinaAddressV3Data, Group, Cell, Icon, Selector, Datetime } from 'vux'
import { Address } from '../api'

const parseArea = (code) => {
  let no = parseInt(code)
  return [`${parseInt(no / 1000) * 1000}`, `${parseInt(no / 100) * 100}`, `${no}`]
}

export default {
  mounted () {
    let self = this
    let $route = this.$route
    self.id = $route.params['id']
    if (isNaN(self.id)) {
      document.title = '编辑地址'
      Address.info(self.id).then(res => {
        let area = parseArea(res.area.id)
        res.isDefault = res.isDefault === '1'
        _.merge(self.$data, res)
        self.zipcode = res.zipCode
        self.area = area
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      document.title = '新增地址'
      self.isDefault = parseInt(self.id) === 0
    }
  },
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
  methods: {
    submit () {
      let self = this
      let $router = this.$router
      let $store = this.$store
      let fields = [
        'id',
        'name',
        'mobile',
        'areaId',
        'zipcode',
        'detailed',
        'isDefault'
      ]
      let data = _.merge({}, _.pick(self.$data, fields))
      data.isDefault = data.isDefault ? 1 : 0
      data.areaId = self.area[2]
      if (!data.name) {
        self.alert('请输入联系人姓名')
        return
      }
      if (!data.mobile) {
        self.alert('请输入联系电话')
        return
      }
      if (!isMobilePhone(data.mobile, 'zh-CN')) {
        self.alert('请输入正确的手机号')
        return
      }
      if (!data.areaId) {
        self.alert('请选择所在区域')
        return
      }
      if (!data.detailed) {
        self.alert('请输入详细地址')
        return
      }
      if (!/^[1-9][0-9]{5}$/.test(data.zipcode)) {
        self.alert('请输入正确的邮政编码')
        return
      }
      Address.save(data)
      .then(res => {
        self.alert(res.info)
        $store.commit('address:update', {updated: true})
        $router.go(-1)
      })
      .catch(error => {
        self.alert(error.info)
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
      id: '',
      name: '',
      mobile: '',
      areaId: '',
      zipcode: '',
      detailed: '',
      defaultValue: '',
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
