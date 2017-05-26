import _ from 'lodash'
import axios from 'axios'

const commit = (params) => {
  return new Promise((resolve, reject) => {
    let data = {}
    let fields = [
      'ecType',
      'orderNumber',
      'amount'
    ]
    _.merge(data, _.pick(params, fields))
    axios.post(`a/api/ecommerce`, data)
    .then(res => {
      console.log(res)
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

const query = (params) => {
  return new Promise((resolve, reject) => {
    let data = {}
    let fields = [
      'ecType'
    ]
    _.merge(data, _.pick(params, fields))
    axios.post(`a/api/ecommerce/list`, data)
    .then(res => {
      console.log(res)
      let response = res.data
      let results
      if (response.status.index === '10000') {
        results = response.results
        resolve(results)
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
  commit,
  query
}
