import _ from 'lodash'
import axios from 'axios'

const query = (params) => {
  return new Promise((resolve, reject) => {
    let data = {}
    let fields = [
      'integralType',
      'recordType'
    ]
    _.merge(data, _.pick(params, fields))
    if (data.integralType === 0) {
      delete data.integralType
    }
    if (data.recordType === 2) {
      delete data.integralType
    } else {
      delete data.recordType
    }
    axios.post(`a/api/integralLog/list`, data)
    .then(res => {
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

const ecex = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(`a/api/address/${id}`)
    .then(res => {
      console.log(res)
      let response = res.data
      if (response.status.index === '10000') {
        resolve(response.results)
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
  query,
  ecex
}
