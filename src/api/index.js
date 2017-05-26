import axios from 'axios'
import Address from './address'
import User from './user'
import Integral from './integral'
import Cart from './cart'
import Category from './category'
import EcTicket from './ecTicket'

const storage = window.localStorage

axios.defaults.baseURL = 'http://duo.authorc.com/duoli'
axios.defaults.headers.common['name'] = 'axios'
axios.interceptors.request.use(function (config) {
  const openId = storage.getItem('openId') || ''
  const token = storage.getItem('token') || ''
  const userInfo = JSON.parse(storage.getItem('userInfo'))
  if (config.data) {
    config.data['openId'] = openId
    config.data['userId'] = userInfo ? userInfo.id : ''
    config.data['token'] = token
  } else {
    config.data = {
      openId: openId,
      token: token,
      userId: userInfo ? userInfo.id : ''
    }
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export {
  Address,
  User,
  Integral,
  Cart,
  Category,
  EcTicket
}
