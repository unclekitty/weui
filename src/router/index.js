import Vue from 'vue'
import Router from 'vue-router'
// auth
import Sigin from '@/components/Sigin'
import Sigup from '@/components/Sigup'
import ForgotPwd from '@/components/ForgotPwd'
import ResetPwd from '@/components/ResetPwd'
// tabs
import Tabs from '@/components/Tabs'
// import Home from '@/components/Home'
// import Contact from '@/components/Contact'
// import Explore from '@/components/Explore'
import Me from '@/components/Me'
// content
import Profile from '@/components/Profile'
import Integral from '@/components/Integral'
import IntegralRule from '@/components/IntegralRule'
import IntegalExchange from '@/components/IntegalExchange'
import IntegalExchangeRecord from '@/components/IntegalExchangeRecord'
import IntegalExchangeDetail from '@/components/IntegalExchangeDetail'
import Message from '@/components/Message'
import Ticket from '@/components/Ticket'
import Address from '@/components/address'
import AddressEdit from '@/components/AddressEdit'

const storage = window.localStorage

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: () => {
        let token = storage.getItem('token')
        if (token) {
          return '/me'
        } else {
          return '/me'
        }
      },
      name: 'Tabs',
      meta: {
        title: '多力'
      },
      component: Tabs,
      children: [
        // {
        //   path: 'home',
        //   name: 'Home',
        //   meta: {
        //     title: '首页'
        //   },
        //   component: Home
        // },
        // {
        //   path: 'contact',
        //   name: 'Contact',
        //   meta: {
        //     title: '联系人'
        //   },
        //   component: Contact
        // },
        // {
        //   path: 'explore',
        //   name: 'Explore',
        //   meta: {
        //     title: '发现'
        //   },
        //   component: Explore
        // },
        {
          path: 'me',
          name: 'Me',
          meta: {
            title: '我'
          },
          component: Me
        }
      ]
    },
    {
      path: '/sigin',
      name: 'Sigin',
      meta: {
        title: '登录'
      },
      component: Sigin
    },
    {
      path: '/Sigup',
      name: 'Sigup',
      meta: {
        title: '注册'
      },
      component: Sigup
    },
    {
      path: '/forgotpwd',
      name: 'ForgotPwd',
      meta: {
        title: '找回密码'
      },
      component: ForgotPwd
    },
    {
      path: '/resetpwd',
      name: 'ResetPwd',
      meta: {
        title: '充值密码'
      },
      component: ResetPwd
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        title: '个人信息'
      },
      component: Profile
    },
    {
      path: '/integral',
      name: 'Integral',
      meta: {
        title: '我的积分'
      },
      component: Integral
    },
    {
      path: '/integralRule',
      name: 'IntegralRule',
      meta: {
        title: '积分规则'
      },
      component: IntegralRule
    },
    {
      path: '/integalExchange',
      name: 'IntegalExchange',
      meta: {
        title: '积分兑换'
      },
      component: IntegalExchange
    },
    {
      path: '/integalExchangeRecord',
      name: 'IntegalExchangeRecord',
      meta: {
        title: '兑换纪录'
      },
      component: IntegalExchangeRecord
    },
    {
      path: '/integalExchangeDetail/:id',
      name: 'IntegalExchangeDetail',
      meta: {
        title: '兑换详情'
      },
      component: IntegalExchangeDetail
    },
    {
      path: '/message',
      name: 'Message',
      meta: {
        title: '消息'
      },
      component: Message
    },
    {
      path: '/ticket',
      name: 'Ticket',
      meta: {
        title: '拍摄小票'
      },
      component: Ticket
    },
    {
      path: '/address',
      name: 'Address',
      meta: {
        title: '地址管理'
      },
      component: Address
    },
    {
      path: '/address/:id',
      name: 'AddressEdit',
      meta: {
        title: '编辑地址'
      },
      component: AddressEdit
    }
  ]
})
