import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

const info = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(`a/api/user/${id}`, {})
    .then(res => {
      console.log(res)
      let response = res.data
      let userInfo = {}
      let fields = [
        'nickName',
        'name',
        'sex',
        'birthday',
        'mobile',
        'email',
        'headimgurl'
      ]
      if (response.status.index === '10000') {
        userInfo = response.results
        _.merge(userInfo, _.pick(userInfo.dlUserInfo, fields))
        if (!userInfo.headimgurl) {
          userInfo.headimgurl = 'static/head.jpeg'
        }
        resolve(userInfo)
      } else {
        reject(response.status)
      }
    })
    .catch(error => {
      console.log(error)
    })
  })
}

const update = (userInfo) => {
  return new Promise((resolve, reject) => {
    let fields = [
      'nickName',
      'name',
      'sex',
      'birthday',
      'mobile',
      'email'
    ]
    let data = _.merge({}, _.pick(userInfo, fields))
    data.birthday = moment(data.birthday).format('YYYY-MM-DD HH:mm:ss')
    axios.put(`a/api/user/${userInfo.id}`, data)
    .then(res => {
      let response = res.data
      if (response.status.index === '10000') {
        resolve(response.status)
      } else {
        reject(response.status)
      }
    })
    .catch(error => {
      console.log(error)
    })
  })
}

const wxlogin = (openId) => {
  return new Promise((resolve, reject) => {
    axios.post('a/api/wxlogin', {openId: openId})
    .then(res => {
      let response = res.data
      let token, userInfo
      if (response.status.index === '10000') {
        token = response.token
        userInfo = response.results
        resolve({
          token: token,
          userInfo: userInfo
        })
      } else {
        reject(response.status)
      }
    })
    .catch(error => {
      console.log(error)
    })
  })
}

const wxbund = (params) => {
  return new Promise((resolve, reject) => {
    let fields = [
      'mobile',
      'password',
      'code',
      'openId'
    ]
    let data = _.merge({}, _.pick(params, fields))
    axios.post('a/api/bund', data)
    .then(res => {
      let response = res.data
      let token, userInfo
      if (response.status.index === '10000') {
        token = response.token
        userInfo = response.results
        resolve({
          token: token,
          userInfo: userInfo
        })
      } else {
        reject(response.status)
      }
    })
    .catch(error => {
      console.log(error)
    })
  })
}

export default {
  info,
  update,
  wxlogin,
  wxbund
}

