import Vue from 'vue'
import Router from 'vue-router'
// auth
import Wechat from '@/components/Wechat'
import Sigin from '@/components/Sigin'
import Sigup from '@/components/Sigup'
import ForgotPwd from '@/components/ForgotPwd'
import ResetPwd from '@/components/ResetPwd'
import Agreement from '@/components/Agreement'
// tabs
import Tabs from '@/components/Tabs'
import Home from '@/components/Home'
import Category from '@/components/Category'
import Explore from '@/components/Explore'
import Cart from '@/components/Cart'
import Me from '@/components/Me'
// shop
import Goods from '@/components/Goods'
import GoodsDetail from '@/components/GoodsDetail'
import Balance from '@/components/Balance'
import Payment from '@/components/Payment'
import Order from '@/components/Order'
import OrderDetail from '@/components/OrderDetail'
// user
import Profile from '@/components/Profile'
import Integral from '@/components/Integral'
import IntegralRule from '@/components/IntegralRule'
import IntegralUseDescription from '@/components/IntegralUseDescription'
// 一期
import IntegalExchange from '@/components/IntegalExchange'
import IntegalExchangeRecord from '@/components/IntegalExchangeRecord'
import IntegalExchangeDetail from '@/components/IntegalExchangeDetail'
// ！一期
import Message from '@/components/Message'
import Ticket from '@/components/Ticket'
import TicketList from '@/components/TicketList'
import ECTicket from '@/components/ECTicket'
import ECTicketList from '@/components/ECTicketList'
import Address from '@/components/Address'
import AddressEdit from '@/components/AddressEdit'
import Settings from '@/components/Settings'

// const storage = window.localStorage
// storage.clear()

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: () => {
        // let token = storage.getItem('token')
        // if (token) {
        //   return '/me'
        // } else {
        //   return '/wechat'
        // }
        return '/wechat'
      },
      name: 'Tabs',
      meta: {
        title: '多力'
      },
      component: Tabs,
      children: [
        {
          path: 'home',
          name: 'Home',
          meta: {
            title: '首页'
          },
          component: Home
        },
        {
          path: 'category',
          name: 'Category',
          meta: {
            title: '分类'
          },
          component: Category
        },
        {
          path: 'explore',
          name: 'Explore',
          meta: {
            title: '发现'
          },
          component: Explore
        },
        {
          path: 'cart',
          name: 'Cart',
          meta: {
            title: '购物车'
          },
          component: Cart
        },
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
      path: '/wechat',
      name: 'Wechat',
      meta: {
        title: '验证'
      },
      component: Wechat
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
        title: '修改密码'
      },
      component: ResetPwd
    },
    {
      path: '/agreement',
      name: 'Agreement',
      meta: {
        title: 'Agreement'
      },
      component: Agreement
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
      path: '/integralUseDescription',
      name: 'IntegralUseDescription',
      meta: {
        title: '积分规则'
      },
      component: IntegralUseDescription
    },
    // /****------
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
        title: '兑换记录'
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
    // --------****/
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
      path: '/ticketlist',
      name: 'TicketList',
      meta: {
        title: '我的小票'
      },
      component: TicketList
    },
    {
      path: '/ecticket',
      name: 'ECTicket',
      meta: {
        title: '电商积分'
      },
      component: ECTicket
    },
    {
      path: '/ecticketlist',
      name: 'ECTicketList',
      meta: {
        title: '电商积分记录'
      },
      component: ECTicketList
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
    },
    {
      path: '/settings',
      name: 'Settings',
      meta: {
        title: '设置'
      },
      component: Settings
    },
    {
      path: '/goods',
      name: 'Goods',
      meta: {
        title: '商品列表'
      },
      component: Goods
    },
    {
      path: '/goodsdetail/:id',
      name: 'GoodsDetail',
      meta: {
        title: '商品详情'
      },
      component: GoodsDetail
    },
    {
      path: '/balance',
      name: 'Balance',
      meta: {
        title: '结算'
      },
      component: Balance
    },
    {
      path: '/payment',
      name: 'Payment',
      meta: {
        title: '支付'
      },
      component: Payment
    },
    {
      path: '/order',
      name: 'Order',
      meta: {
        title: '我的订单'
      },
      component: Order
    },
    {
      path: '/orderdetail/:id',
      name: 'OrderDetail',
      meta: {
        title: '订单详情'
      },
      component: OrderDetail
    }
  ]
})
