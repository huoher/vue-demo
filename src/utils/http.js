import axios from 'axios'
import router from './router'
import store from './store'

axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.API_HOST

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    const token = localStorage.getItem(process.env.VUE_APP_NAME + 'token')
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // let that = this
    if (response.data.errCode * 1 === 454) {
      // 针对没有admin权限的user尝试访问admin页面
      router.push({
        path: '/'
      })
    }
    return response
  },
  error => {
    if (error.response.status === 401) {
      // 针对token过期导致的401
      const token = localStorage.getItem(process.env.VUE_APP_NAME + 'token')
      // 尝试刷新token
      if (token && router.currentRoute.name !== 'Login') {
        // return reRequest(error)
        // console.log(error.response.headers.authorization)
        if (error.response.headers.authorization) {
          localStorage.setItem(process.env.VUE_APP_NAME + 'token', error.response.headers.authorization)
          const config = error.response.config
          // console.log(config.headers.Token)
          config.headers.Authorization = error.response.headers.authorization
          // console.log(config.headers.Token)
          console.log('token已刷新')
          // 如果有data参数，需要将已经stringify的JSON字符串转化为js对象，重新请求时会被再次stringify
          if (config.data) {
            config.data = JSON.parse(config.data)
          }
          return axios.request(config)
        } else {
          // 未返回authorization
          router.push({
            path: '/'
          })
        }
      } else {
        // 针对没有登录尝试访问map页面
        router.push({
          path: '/'
        })
      }
    }
    // 登录状态过期
    if (error.response.status === 332) {
      store.dispatch('removeToken').then(_ => {
      })
      store.dispatch('removeUserInfo').then(_ => {
      })
      router.push({
        path: '/',
        beforeRouteEnter: (to, from, next) => {
          alert('登录状态过期，请重新登录')
        }
      }).then(_ => {
      })
    }
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param params
 * @returns {Promise}
 */
export function del (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param config
 * @param params
 * @returns {Promise}
 */
export function download (url, config = {}, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, Object.assign(config, params))
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
