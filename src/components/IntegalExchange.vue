<template>
  <div class="page-ingegal-exchange">
    <group class="address">
      <cell title="选择收获地址" is-link @click.native="select()"></cell>
      <div class="address-info">
        <div class="row">
          <span>收件人：{{address.name}}</span>
          <span>{{address.mobile}}</span>
        </div>
        <div class="row">
          <span>收件地址：{{address.detailed}}</span>
        </div>
      </div>
    </group>

    <card class="card">
      <div slot="header" class="header">
        <span class="title">多力集团</span>
      </div>
      <div slot="content" class="content">
        <span class="thumb">
          <img src="../assets/bg.png">
        </span>
        <div class="body">
          <div class="title">皇帝碗</div>
          <p class="sub">
            <span>积分300</span>
            <x-number class="number" :value="0" :min="0"></x-number>
          </p>
        </div>
      </div>
      <div slot="footer" class="footer">
        <div></div>
        <div class="align-right">
          <p>共计1件商品 合计：<span class="warn">300积分</span></p>
          <p>持有积分：<span class="primary">3200</span></p>
        </div>
      </div>
    </card>
    
    <div class="footer">
        <x-button type="warn">保存</x-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { XNumber, XButton, Card, Group, Cell, Icon } from 'vux'

export default {
  beforeDestroy () {
    let $store = this.$store
    $store.commit('selected', {data: {}})
  },
  components: {
    XNumber,
    XButton,
    Card,
    Group,
    Cell,
    Icon
  },
  methods: {
    select () {
      let self = this
      let $router = this.$router
      self
      $router.push({name: 'Address', params: { select: true }})
    }
  },
  computed: {
    ...mapState({
      address: state => state.address.data
    })
  },
  data () {
    return {
      title: ''
    }
  }
}
</script>

<style lang="scss">
.page-ingegal-exchange{
  .address{
    .weui-cells{
      margin: 0;
    }
    .address-info{
      padding: 15px;
      font-size: .9em;
      position: relative;
      color: #333;

      &:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleY(0.5);
      }

      .row{
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .card{
    border-radius: 6px;

    .header, .footer{
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
        bottom: 0;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleY(0.5);
      }
      &.footer{
        &:before{
          top: 0;
          bottom: auto;
        }
        .align-right{
          text-align: right;
          font-size: .9em;
        }
      }
    }
    .content{
      padding: 15px 15px;
      color: #666;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .thumb{
        width: 80px;
        height: 80px;
        margin-right: 15px;
        flex-shrink: 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .body{
        width: 100%;
      }
      .title{
        font-size: 1.3em;
        margin-bottom: 15px;
      }
      .sub{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .number{
          padding: 0;
          &:before{
            display: none;
          }
          .vux-number-selector-plus{
            margin: 0;
          }
        }
      }
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

