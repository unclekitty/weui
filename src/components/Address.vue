<template>
  <div class="page-address">
    <card class="card" v-for="item in list" :key="item.id">
        <div slot="header" class="header">
            <div class="row">
                <span class="title">张全蛋</span>
            </div>
            <div class="row">
                <span class="title">上海市浦东新区东方路889号</span>
            </div>
        </div>
        <div slot="footer" class="footer">
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox1"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>默认地址</p>
                    </div>
                </label>
            </div>
            <!--<x-number :value="0" :min="0"></x-number>-->
            <div class="align-right">
                <x-button mini type="warn">
                    <x-icon type="ios-trash" size="18"></x-icon>删除
                </x-button>
                <x-button mini type="primary" @click.native="editor(0)">
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
    editor (id) {
      let $router = this.$router
      if (id) {
        $router.push(`address/${id}`)
      } else {
        $router.push('address/0')
      }
    }
  },
  data () {
    return {
      title: '',
      list: [{
        id: 1,
        date: '2017-5-12 8:00',
        status: '小票审核通过',
        content: '小票兑换成功+20积分，目前积分520分'
      },
      {
        id: 2,
        date: '2017-5-12 8:00',
        status: '小票审核通过',
        content: '小票兑换成功+20积分，目前积分520分'
      }]
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
