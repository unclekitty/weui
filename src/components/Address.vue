<template>
  <div class="page-address">
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
                <label class="weui-cell weui-check__label">
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

    <footer>
        <x-button type="warn" @click.native="editor(0)">添加新地址</x-button>
    </footer>
  </div>
</template>

<script>
import { XButton, Checklist, Box, Card, Group, Cell, Icon } from 'vux'

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
    Icon
  },
  methods: {
    load () {
      let self = this
      let $http = this.$http
      $http.post(`a/api/address/list`, {}).then(res => {
        let response = res.body
        let list = response.results.list
        for (let i = 0; i < list.length; i++) {
          list[i].isDefault = list[i].isDefault === '1'
        }
        self.list = list
      })
    },
    editor (id) {
      let $router = this.$router
      if (id) {
        $router.push(`address/${id}`)
      } else {
        $router.push('address/0')
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
    select (item) {
      let self = this
      let $router = this.$router
      let $store = this.$store
      $store.commit('selected', {data: item})
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
  data () {
    return {
      title: '',
      list: [],
      isSelect: false
    }
  }
}
</script>

<style lang="scss">
.page-address{

  .card{
    margin-top: 15px;
    box-shadow: 2px 2px 1px rgba(204, 204, 204, 0.51);

    &:before,&:after{
      display: none;
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
