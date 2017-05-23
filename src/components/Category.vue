<template>
  <div class="page-category">
    <search class="search" @on-submit="onSubmit" :auto-fixed="autoFixed" @on-focus="onFocus" @on-cancel="onCancel"></search>
    <div class="wrapper">
      <div class="category">
        <scroller class="category-scroller">
          <group class="group">
            <cell class="item" :class="{'active': $index == seletedIndex}" :title="item.title" :border-intent="false" v-for="(item, $index) in category" :key="$index" @click.native="select($index)"></cell>
          </group>
        </scroller>
      </div>
      <div class="sub-category">
        <scroller class="sub-category-scroller">
          <div class="inner">
            <template v-for="ca in subCategory">
              <divider>{{ca.title}}</divider>
              <div class="grid">
                <router-link class="item" v-for="item in list" :key="item.title" to="goods">
                  <img :src="item.img">
                  <div class="m-title">
                    {{item.title}}
                  </div>
                </router-link>
              </div>
            </template>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell, Icon, Search, Divider } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Icon,
    Search,
    Divider
  },
  methods: {
    onSubmit () {

    },
    onFocus () {

    },
    onCancel () {

    },
    select (index) {
      this.seletedIndex = index
    }
  },
  data () {
    return {
      title: 'Category',
      autoFixed: false,
      seletedIndex: 0,
      category: [
        {
          title: '名品服饰'
        },
        {
          title: '数码家店'
        },
        {
          title: '美妆日化'
        },
        {
          title: '家居生活'
        },
        {
          title: '户外文体'
        }
      ],
      subCategory: [
        {
          title: '男装'
        },
        {
          title: '女装'
        },
        {
          title: '童装'
        },
        {
          title: '内衣'
        }
      ],
      list: [{
        title: '潮流',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '美容',
        img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
      }, {
        title: '精选',
        img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
      }, {
        title: '潮流',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '美容',
        img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
      }, {
        title: '精选',
        img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
      }]
    }
  }
}
</script>

<style lang="scss">
.page-category{
  display: inherit;
  .wrapper{
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 0;

    .category{
      position: relative;
      width: 100px;
      .group{
        .weui-cells{
          margin: 0;
          background: transparent;
          &:before{
            display: none;
          }
          .item{
            padding: 20px 15px;
            &.active{
              background: #fff;
            }
          }
        }
      }
    }
    .sub-category{
      flex: 1;
      position: relative;
      width: 100%;
      background: #fff;
      .vux-divider{
        padding: 20px 10px;
      }
      .grid{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap:wrap;

        padding: 10px;

        .item{
          width: 33.333%;
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center center;
          color: #666;
          
          &:first-child{
            margin-left: 0;
          }
          img {
            max-width: 65px;
            margin-bottom: 10px;
          }
          .m-title{
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
