export default function address ($http) {
  const query = () => {
    const promise = new Promise((resolve, reject) => {
      $http.post(`a/api/address/list`, {}).then(res => {
        let response = res.body
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
    })
    return promise
  }
  const save = (data) => {
    const promise = new Promise((resolve, reject) => {
      if (!isNaN(data.id)) {
        $http.post(`a/api/address`, data).then(res => {
          let response = res.body
          if (response.status.index === '10000') {
            resolve(response.status)
          } else {
            reject(response.status)
          }
        })
      } else {
        $http.put(`a/api/address/${data.id}`, data).then(res => {
          let response = res.body
          if (response.status.index === '10000') {
            resolve(response.status)
          } else {
            reject(response.status)
          }
        })
      }
    })
    return promise
  }
  const remove = (id) => {
    const promise = new Promise((resolve, reject) => {
      $http.delete(`a/api/address/${id}`, {id: id}).then(res => {
        let response = res.body
        if (response.status.index === '10000') {
          // $store.commit('address:update', {updated: true})
        }
      })
    })
    return promise
  }
  return {
    query,
    save,
    remove
  }
}

