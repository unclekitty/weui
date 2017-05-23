<template>
  <div class="page-home">
    <search class="search" @on-submit="onSubmit" :auto-fixed="autoFixed" @on-focus="onFocus" @on-cancel="onCancel"></search>
    <scroller>
      <div class="inner">
        <swiper :list="swiper" auto></swiper>
        <group class="group" title="推荐">
          <div class="grid" rows="2">
            <router-link class="grid-item" to="goods">
              <span class="img" :style="`background-image: url(${img});`"></span>
            </router-link>
            <div class="grid-item">
              <div class="grid" cols="2">
                <router-link class="grid-item" to="goods">
                  <span class="img" :style="`background-image: url(${img});`"></span>
                </router-link>
                <router-link class="grid-item" to="goods">
                  <span class="img" :style="`background-image: url(${img});`"></span>
                </router-link>
              </div>
            </div>
          </div>
        </group>
        <group class="group" title="分类">
          <div class="category">
            <router-link class="ca-item" to="goods">
              <img class="icon" :src="icon">
              <span class="label">分类</span>
            </router-link>
            <router-link class="ca-item" to="goods">
              <img class="icon" :src="icon">
              <span class="label">分类</span>
            </router-link>
            <router-link class="ca-item" to="goods">
              <img class="icon" :src="icon">
              <span class="label">分类</span>
            </router-link>
            <router-link class="ca-item" to="goods">
              <img class="icon" :src="icon">
              <span class="label">分类</span>
            </router-link>
          </div>
        </group>
        <group class="group" title="商品推荐">
          <div class="goods">
            <div class="inner">
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
        </group>
      </div>
    </scroller>
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
    onSubmit () {

    },
    onFocus () {

    },
    onCancel () {

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
.page-home {

  .wrapper {
    padding: 15px;
  }
  .scroll {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
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

  .group {
    .weui-cells__title {
      color: #333;
      font-size: 16px;
    }
    .weui-cells {
      background: transparent;
      &:before,
      &:after {
        display: none;
      }
    }
    &:last-child {
      margin-bottom: 50px;
    }
  }
  .grid {
    display: box;
    display: -webkit-box;
    height: 160px;
    .grid-item {
      position: relative;
      display: block;
      
      .img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-size: cover;
      }
    }
    &[rows] {
      -webkit-box-orient: horizontal;
    }
    &[cols] {
      -webkit-box-orient: vertical;
    }
    &[rows="2"]>.grid-item {
      -webkit-box-flex: 1;
    }
    &[cols="2"]>.grid-item {
      -webkit-box-flex: 1;
    }
  }

  .category {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px 0;
    background: #fff;

    .ca-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
        width: 45px;
        height: 45px;
      }

      .label {
        margin-top: 10px;
        color: #666;
      }
    }
  }
  .goods {
    padding: 0 10px;
    margin-bottom: 20px;
    .inner {
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
</style>
