<template>
  <div class="page-home">
    <search class="search" @on-submit="onSubmit" :auto-fixed="autoFixed" @on-focus="onFocus" @on-cancel="onCancel"></search>

    <swiper :list="demo01_list" auto></swiper>

    <group title="cell">
      <cell title="Vux" value="Wechat" is-link></cell>
    </group>
    
    <div class="wrapper">

      <group title="toast">
        <x-button @click.native="show(true)" type="primary">Toast</x-button>
      </group>

      <group title="toast">
        <x-button @click.native="showActionsheet(true)" type="primary">Toast</x-button>
      </group>

      <group title="confirm">
        <x-button @click.native="showPlugin(true)" type="primary">Confirm</x-button>
      </group>
    </div>

    <toast v-model="show1" @on-hide="onHide">Hello</toast>
    <actionsheet v-model="show5" :menus="menus" show-cancel @on-click-menu="click"></actionsheet>
  </div>
</template>

<script>
import { Actionsheet, Confirm, Toast, Group, Cell, XButton, Swiper, Search } from 'vux'

export default {
  components: {
    Actionsheet,
    Confirm,
    Toast,
    Group,
    Cell,
    XButton,
    Swiper,
    Search
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    show (val) {
      if (val) {
        this.show1 = true
      }
    },
    showActionsheet (val) {
      if (val) {
        this.show5 = true
      }
    },
    click () {
      console.log(1)
    },
    showPlugin () {
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        },
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          console.log('plugin confirm')
        }
      })
    },
    onSubmit (val) {
      window.alert('on submit' + val)
    },
    onCancel () {
      console.log('on cancel')
    },
    onFocus () {
      console.log('on focus')
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      show1: false,
      show5: false,
      menus: [{
        label: `Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>`,
        type: 'info'
      }, {
        label: 'Primary',
        type: 'primary',
        value: 'primary'
      }, {
        label: 'Warn',
        type: 'warn'
      }, {
        label: 'Disabled',
        type: 'disabled'
      }, {
        label: 'Default'
      }],
      demo01_list: [{
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
.page-home{
  
  .wrapper {
    padding:15px;
  }

  .search {
    position: fixed!important;
    z-index: 100;

    .weui-search-bar{
      background-color: rgba(0,0,0,.2);
      &:after{
        border-bottom: 1px solid rgba(0,0,0,.2);
      }
    }
    
    form {
      background: none;
      
    }
  }
}
</style>
