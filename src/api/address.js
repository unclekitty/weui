import _ from 'lodash'
import axios from 'axios'

const query = () => {
  return new Promise((resolve, reject) => {
    axios.post(`a/api/address/list`, {})
    .then(res => {
      console.log(res)
      let response = res.data
      let list
      if (response.status.index === '10000') {
        list = response.results.list
        for (let i = 0; i < list.length; i++) {
          list[i].isDefault = list[i].isDefault === '1'
        }
        resolve(list)
      } else {
        reject(response.status)
      }
    })
    .catch(error => {
      console.log(error)
    })
  })
}

const info = (id) => {
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

const save = (params) => {
  return new Promise((resolve, reject) => {
    let fields = [
      'id',
      'name',
      'mobile',
      'areaId',
      'zipcode',
      'detailed',
      'isDefault'
    ]
    let data = _.merge({}, _.pick(params, fields))
    if (!isNaN(data.id)) {
      axios.post(`a/api/address`, data)
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
    } else {
      axios.put(`a/api/address/${data.id}`, data)
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
    }
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`a/api/address/${id}`, {id: id})
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

const setDefault = (id) => {
  return new Promise((resolve, reject) => {
    let data = {
      id: id,
      isDefault: 1
    }
    axios.put(`a/api/address/${id}`, data)
    .then(res => {
      let response = res.data
      if (response.status.index === '10000') {
        resolve(response.status)
      } else {
        reject(response.status)
      }
    })
  })
}

export default {
  query,
  info,
  save,
  remove,
  setDefault
}

