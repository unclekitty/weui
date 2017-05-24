<template>
  <div class="page-address-edit">
    <group class="form">
      <x-input title="联系人" placeholder="请输入联系人姓名" v-model="name" novalidate></x-input>
      <x-input title="联系电话" placeholder="请输入联系人手机号" v-model="mobile" keyboard="number" is-type="china-mobile"></x-input>
      <x-address title="所在区域" v-model="area" raw-value :list="addressData" value-text-align="left"></x-address>
      <x-input title="详细地址" placeholder="请输入详细地址" v-model="detailed" novalidate></x-input>
      <x-input title="邮政编码" placeholder="请输入邮政编码" v-model="zipcode" novalidate></x-input>
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
import { XAddress, XInput, XButton, XSwitch, ChinaAddressV3Data, Group, Cell, Icon, Selector, Datetime } from 'vux'

const parseArea = (code) => {
  let no = parseInt(code)
  return [`${parseInt(no / 1000) * 1000}`, `${parseInt(no / 100) * 100}`, `${no}`]
}

export default {
  mounted () {
    let self = this
    let $route = this.$route
    let $http = this.$http
    self.id = $route.params['id']
    if (isNaN(self.id)) {
      $route.meta.title = '编辑地址'
      $http.post(`a/api/address/${self.id}`).then(res => {
        let results = res.body.results
        let area = parseArea(results.area.id)
        results.isDefault = results.isDefault === '1'
        _.merge(self.$data, results)
        self.zipcode = results.zipCode
        self.area = area
      })
    } else {
      $route.meta.title = '新增地址'
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
      let $http = this.$http
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
      console.log(self.area)
      data.areaId = self.area[2]
      if (!isNaN(self.id)) {
        $http.post(`a/api/address`, data).then(res => {
          let response = res.body
          self.alert(response.status.info)
          $router.go(-1)
          $store.commit('update', {updated: true})
        })
      } else {
        $http.put(`a/api/address/${self.id}`, data).then(res => {
          let response = res.body
          self.alert(response.status.info)
          $router.go(-1)
          $store.commit('update', {updated: true})
        })
      }
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
