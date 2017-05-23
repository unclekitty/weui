<template>
    <div class="page-goods">
        <header>
            <search class="search" @on-submit="onSubmit" :auto-fixed="autoFixed" @on-focus="onFocus" @on-cancel="onCancel"></search>
        </header>
        <header class="sub-header">
            <div class="order" :class="cssClass" @click="toggle()">
                <span>综合</span>
            </div>
            <div class="order" :class="cssClass" @click="toggle()">
                <span>销量</span>
            </div>
            <div class="order" :class="cssClass" @click="toggle()">
                <span>价格</span>
            </div>
            <div class="view-toggle">
                <i class="glyph-icon flaticon-app"></i>
            </div>
        </header>
        <div class="view">
            <scroller>
                <div class="goods">
                    <div class="goods-inner">
                        <template v-for="i in 50">
                            <router-link class="goods-item" to="goodsdetail/100">
                                <div class="goods-item-box">
                                    <div class="thumb">
                                        <span class="img" :style="`background-image: url(${img});`"></span>
                                    </div>
                                    <div class="info">
                                        <div class="title">山东特产手工水饺</div>
                                        <div class="desc">
                                            <span class="price">
                                                <span class="danger">200</span>积分
                                            </span>
                                            <span class="cart">
                                                <i class="glyph-icon flaticon-gift warn"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </template>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
import { Group, Cell, Swiper, Search } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Swiper,
    Search
  },
  methods: {
    toggle () {
      let self = this
      self.order += 1
      if (self.order > 2) {
        self.order = 0
      }
      console.log(self.order)
    },
    onSubmit () {

    },
    onFocus () {

    },
    onCancel () {

    }
  },
  computed: {
    cssClass () {
      return {
        '': this.order === 0,
        'up': this.order === 1,
        'down': this.order === 2
      }
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg',
      icon: 'static/b.png',
      order: 0,
      swiper: [{
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg',
        title: '送你一朵fua'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/2.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/3.jpg',
        title: '送你一次旅行'
      }],
      autoFixed: false
    }
  }
}
</script>

<style lang="scss">
.page-goods {

    .search {
        position: fixed!important;
        z-index: 100;
        .weui-search-bar {
            background-color: rgba(0, 0, 0, .2);
            &:after {
                border-bottom: 1px solid rgba(0, 0, 0, .2);
            }
        }

        form {
            background: none;
        }
    }
    .sub-header {
        position: fixed!important;
        left: 0;
        right: 0;
        top: 44px;
        height: 44px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: 100;

        .order {
            width: 100%;
            padding: 8px 0;
            text-align: center;
            &:after {
                content: '';
                display: inline-block;
                visibility: hidden;
                vertical-align: middle;
                height: 6px;
                width: 6px;
                margin-left: 4px;
                border-width: 1px 1px 0 0;
                border-color: #999;
                border-style: solid;
            }
            &.up:after {
                visibility: visible;
                transform: rotate(-45deg);
            }
            &.down:after {
                visibility: visible;
                transform: rotate(135deg);
            }
        }
        .view-toggle {
            position: relative;
            width: 80%;
            padding: 5px 0;
            text-align: center;
            font-size: 1.2em;
            &:before {
                content: " ";
                position: absolute;
                top: 8px;
                left: 0;
                bottom: 8px;
                width: 1px;
                border-left: 1px solid #D9D9D9;
                color: #D9D9D9;
                transform-origin: 100% 0;
                transform: scaleX(0.5);
            }
        }
        &:after {
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
    }
    .view {
        position: absolute;
        top: 88px;
        left: 0; 
        right: 0;
        bottom: 0;
        
        .goods {
            padding: 0 10px;
            margin-bottom: 20px;
            .goods-inner {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -10px;
            }
            .goods-item {
                flex-basis: 50%;
                box-sizing: border-box;

                .goods-item-box {
                    display: flex;
                    flex-direction: column;
                    padding: 10px 5px;
                    box-sizing: border-box;
                    background: #fff;
                    .thumb {
                        position: relative;
                        height: 140px;

                        .img {
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 100%;
                            width: 100%;
                            background-size: cover;
                        }
                    }

                    .info {
                        .title {
                            margin: 10px 0;
                        }
                        .desc {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color: #666;
                            .cart {
                                font-size: 1.2em;
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
