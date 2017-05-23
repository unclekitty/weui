<template>
  <div class="page-goods-detail">
    <tab class="tab">
      <tab-item selected @click.native="scrollTo()">商品</tab-item>
      <tab-item @click.native="scrollTo('#details')">详情</tab-item>
      <tab-item @click.native="scrollTo('#parameter')">参数</tab-item>
    </tab>
    <div class="view">
      <scroller ref="scroller">
        <div class="inner">
          <div class="wrapper">
            <swiper :options="swiperOption" class="swiper" :style="`height:${height()}`">
              <swiper-slide v-for="slide in swiperSlides" :key="slide.title">
                <span class="img" :style="`background-image: url(${slide.img});`"></span>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="info">
              <h2 class="title">山东特产手工水饺</h2>
              <div class="price">
                <span class="warn">320积分</span>
              </div>
            </div>
          </div>

          <group>
            <cell title="选择规格/颜色分类" is-link></cell>
          </group>

          <group title="店铺">
            <cell title="多力集团"></cell>
          </group>

          <group title="详情" id="details">
            <div class="ximg-demo" v-for="(src, $index) in list" :key="$index">
              <img :src="src">
            </div>
          </group>

          <group title="参数" id="parameter">
            <cell title="品牌" value="多力"></cell>
            <cell title="产地" value="上海"></cell>
            <cell title="使用类型" value="生活用品"></cell>
            <cell title="规格" value="40ml"></cell>
            <cell title="生产日期" value="2017-01-01"></cell>
          </group>
        </div>
      </scroller>
    </div>

    <footer>
      <router-link class="btn" to="/home">
        <i class="weui-icon weui-icon-* glyph-icon flaticon-home-1"></i>
        <span class="label">商城</span>
      </router-link>
      <router-link class="btn" to="/cart">
        <i class="weui-icon weui-icon-* glyph-icon flaticon-gift"></i>
        <span class="label">购物车</span>
      </router-link>
      <x-button type="danger" @click.native="addCart()">加入购物车</x-button>
      <x-button type="warn" @click.native="addCart()">立即兑换</x-button>
    </footer>

    <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
      <card class="card">
        <div slot="content" class="content">
          <span class="thumb">
            <img src="../assets/bg.png">
          </span>
          <div class="body">
            <h2 class="title">山东特产手工水饺</h2>
            <div class="price">
              <span class="warn">320积分</span>
            </div>
            <p class="sub">
              <span></span>
              <x-number class="number" :value="0" :min="0"></x-number>
            </p>
          </div>
        </div>
        <div slot="footer" class="footer">
          <div class="group">
            <span class="title">套餐</span>
            <checker default-item-class="checker-item" selected-item-class="checker-item-selected">
              <checker-item v-for="i in [1, 2, 3]" :key="i" :value="i">￥{{i*300}}</checker-item>
            </checker>
          </div>
          <div class="group">
            <span class="title">颜色</span>
            <checker default-item-class="checker-item" selected-item-class="checker-item-selected">
              <checker-item v-for="i in ['金色', '银色', '粉色']" :key="i" :value="i">{{i}}</checker-item>
            </checker>
          </div>
        </div>
      </card>
      <div class="footer">
        <x-button type="warn" @click.native="go()">提交</x-button>
      </div>
    </popup>

  </div>
</template>

<script>
import { Group, Cell, Search, XButton, XNumber, Tab, TabItem, Popup, Card, Checker, CheckerItem } from 'vux'

// function offsetTop (el, offset) {
// }

export default {
  mounted () {
  },
  components: {
    Group,
    Cell,
    Search,
    XButton,
    XNumber,
    Tab,
    TabItem,
    Popup,
    Card,
    Checker,
    CheckerItem
  },
  methods: {
    onSubmit () {

    },
    onFocus () {

    },
    onCancel () {

    },
    height () {
      return `${window.innerWidth}px`
    },
    log (msg) {
      console.log(msg)
    },
    addCart () {
      this.show = true
    },
    go () {
      let self = this
      let $router = this.$router
      self.show = false
      $router.push('/cart')
    },
    scrollTo (selector) {
      let self = this
      let top = 0
      let tag
      if (selector) {
        tag = self.$el.querySelector(selector)
        top = tag.offsetTop
      }
      self.$refs.scroller.scrollTo(0, top, true)
    }
  },
  data () {
    return {
      title: 'goods detail',
      show: false,
      $scroller: null,
      swiperSlides: [{
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg',
        title: '送你一朵fua'
      }, {
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg',
        title: '送你一辆车'
      }, {
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg',
        title: '送你一次旅行'
      }],
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      },
      autoFixed: false,
      list: [
        'https://o5omsejde.qnssl.com/demo/test1.jpg',
        'https://o5omsejde.qnssl.com/demo/test2.jpg',
        'https://o5omsejde.qnssl.com/demo/test9.jpg',
        'https://o5omsejde.qnssl.com/demo/test4.jpg',
        'https://o5omsejde.qnssl.com/demo/test5.jpg',
        'https://o5omsejde.qnssl.com/demo/test6.jpg',
        'https://o5omsejde.qnssl.com/demo/test7.jpg',
        'https://o5omsejde.qnssl.com/demo/test8.jpg'
      ]
    }
  }
}
</script>

<style lang="scss">
.page-goods-detail {
  .tab {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 100;
  }

  .view {
    position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 44px;
  }

  .inner {
    overflow: hidden;
  }

  .swiper {
    .img{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  }

  .wrapper{
    background: #fff;
  }

  .info {
    padding: 10px;
    .title {
      font-size: 1.2em;
    }
    .price {
      font-size: 1.4em;
      font-weight: 600;
    }
  }

  footer{
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    background: #fff;
    color: #666;
    box-shadow: -1px -1px 2px #ccc;

    .btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      flex-basis: 20%;
      height: 100%;
      padding: 0 10px;
      position: relative;
      &:after {
          content: " ";
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          bottom: 0;
          border-right: 1px solid #D9D9D9;
          color: #D9D9D9;
          transform-origin: 100% 0;
          transform: scaleX(0.5);
      }
      .weui-icon {
        font-size: 1.3em;
      }
      .label {
        font-size: .8em;
      }
    }

    button {
      width: 120px;
      height: 100%;
      font-weight: 300;
      font-size: 0.9em;
      margin: 0!important;
      padding: 0;
      border-radius: 0;
      flex-basis: 50%;
      &:after {
        display: none;
      }
    }
  }

  .vux-popup-dialog {
    .card{
      border-radius: 6px;

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
          font-size: 1em;
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

      .footer {
        padding: 15px;
        .group {
          padding: 10px 0;

          .title {
            display: block;
            margin-bottom: 10px;
            font-weight: normal;
            color: #666;
          }
        }
      }

    }

    .footer{
      button {
        border-radius: 0;
        &:after {
          display: none;
        }
      }
    }

    .checker-item {
      padding: 2px 10px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 3px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-right: 6px;
    }
    .checker-item-selected {
      border-color: #ff4a00;
    }
    }
  }

  .weui-cells__title {
    font-size: 1.2em;
  }

  .ximg-demo {
    img {
      width: 100%;
      height: auto;
    }
  }

</style>
