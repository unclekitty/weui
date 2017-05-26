<template>
  <div class="page-address">
    <div class="content">
      <scroller>
        <div class="scroller-inner">
          <!--spinner-->
          <div class="spinner" v-if="loading || list.length === 0">
            <div v-if="loading">
              <spinner type="lines"></spinner>
              <p>正在加载...</p>
            </div>
            <div v-else-if="list.length === 0">
              <icon type="info"></icon>
              <p>您还没有添加地址...</p>
            </div>
          </div>
          <!--/spinner-->
          <card class="card" v-for="item in list" :key="item.id" @click.native="select(item)">
              <div slot="header" class="header">
                  <div class="row">
                      <span class="title">{{item.name}} {{item.mobile}}</span>
                  </div>
                  <div class="row">
                      <span class="title">{{item.detailed}}</span>
                  </div>
              </div>
              <div slot="footer" class="footer">
                  <div class="weui-cells weui-cells_checkbox">
                      <label class="weui-cell weui-check__label" @click="setDefault(item, $event)">
                          <div class="weui-cell__hd">
                              <input type="checkbox" class="weui-check" name="isdefault" v-model="item.isDefault"/>
                              <i class="weui-icon-checked"></i>
                          </div>
                          <div class="weui-cell__bd">
                              <p>默认地址</p>
                          </div>
                      </label>
                  </div>
                  <!--<x-number :value="0" :min="0"></x-number>-->
                  <div class="align-right">
                      <x-button mini type="warn" @click.native.stop="dele(item.id)">
                          <x-icon type="ios-trash" size="18"></x-icon>删除
                      </x-button>
                      <x-button mini type="primary" @click.native.stop="editor(item.id)">
                          <x-icon type="ios-compose" size="18"></x-icon>编辑
                      </x-button>
                  </div>
              </div>
          </card>
        </div>
      </scroller>
    </div>
    <footer>
        <x-button type="warn" @click.native="editor(0)">添加新地址</x-button>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { XButton, Checklist, Box, Card, Group, Cell, Icon, Spinner } from 'vux'

export default {
  created () {
    let self = this
    self.load()
  },
  mounted () {
    let self = this
    let $route = this.$route
    self.isSelect = $route.params['select']
  },
  components: {
    XButton,
    Checklist,
    Box,
    Card,
    Group,
    Cell,
    Icon,
    Spinner
  },
  methods: {
    load () {
      let self = this
      const $api = this.$api
      const address = $api.address
      address.query().then(list => {
        self.list = list
        self.loading = false
      })
    },
    onUpdate (val, old) {
      let self = this
      let $store = this.$store
      console.log(val)
      if (val) {
        self.load()
        $store.commit('address:update', {updated: false})
      }
    },
    editor (id) {
      let self = this
      let $router = this.$router
      if (id) {
        $router.push(`address/${id}`)
      } else {
        if (self.list.length < 5) {
          $router.push(`address/${self.list.length || 0}`)
        } else {
          self.alert('最多支持维护5个地址')
        }
      }
    },
    dele (id) {
      let self = this
      let $http = this.$http
      self.confirm('确定要删除？', flag => {
        if (flag) {
          $http.delete(`a/api/address/${id}`, {id: id}).then(res => {
            let response = res.body
            self.alert(response.status.info)
            self.load()
          })
        }
      })
    },
    setDefault (item, event) {
      let self = this
      let $http = this.$http
      if (item.isDefault) {
        event.preventDefault()
      }
      $http.put(`a/api/address/${item.id}`, {id: item.id, isDefault: 1}).then(res => {
        self.load()
      })
    },
    select (item) {
      let self = this
      let $router = this.$router
      let $store = this.$store
      $store.commit('address:selected', {data: item})
      if (self.isSelect) {
        $router.go(-1)
      }
    },
    confirm (message, callback) {
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '确认',
        content: message,
        onCancel () {
          callback(false)
        },
        onConfirm () {
          callback(true)
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
  computed: {
    ...mapState({
      updated: state => state.address.updated
    })
  },
  data () {
    return {
      title: '',
      list: [],
      isSelect: false,
      loading: true
    }
  },
  watch: {
    'updated': 'onUpdate'
  }
}
</script>

<style lang="scss">
.page-address{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto!important;
  bottom: 44px;
  .content {
    position: relative;
    height: 100%;
  }
  .scroller-inner {
    overflow: hidden;
  }
  .card{
    margin-top: 15px;
    box-shadow: 2px 2px 1px rgba(204, 204, 204, 0.51);

    &:before,&:after{
      display: none;
    }
    &:last-child {
      margin-bottom: 15px;
    }
    
    .header{
        padding: 10px 0;
        .row{
            padding: 5px 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #666;
        }
    }
    .footer{
        padding: 15px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666;

        &:before {
            content: " ";
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            top: 0;
            border-bottom: 1px solid #D9D9D9;
            color: #D9D9D9;
            transform-origin: 100% 0;
            transform: scaleY(0.5);
        }
        .align-right{
            text-align: right;
            font-size: .8em;
        }
        .weui-btn{
            margin: 0;
            .vux-x-icon {
                vertical-align: middle;
                margin-top: -4px;
                fill: #fff;
            }
        }
        .weui-cells_checkbox{
            margin: 0;
            &:before, &:after{
                display: none;
            }
            label{
                padding: 0;
                background: none!important;
                &:before, &:after{
                    display: none;
                }
            }
        }
    }
    .content{
        position: relative;
        padding: 20px 15px;
        color: #666;

        &:before {
            content: " ";
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            top: 0;
            border-bottom: 1px solid #D9D9D9;
            color: #D9D9D9;
            transform-origin: 100% 0;
            transform: scaleY(0.5);
        }
    }
  }

  footer{
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
