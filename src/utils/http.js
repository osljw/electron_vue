import axios from 'axios'
import qs from 'qs'

// 环境的切换
axios.defaults.baseURL = 'http://localhost:8000/api/';
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'http://localhost:8000/api/';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'http://localhost:8000/api/';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'http://localhost:8000/api/';
}

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})

export default {

  post(url, data) {
    console.log("NODE_ENV:" + process.env.NODE_ENV)
    console.log("baseurl:" + axios.defaults.baseURL)
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
    })
    .then(
      (response) => {
        if (response.status && response.status != 200) {
          console.log("axios post failed")
          //这里返回的数据结构可以根据实际情况自定义
          return {
            ExceptionCode: 0,
            Code: 100000,
            Message: '加载失败,请重试',
            ServerTime: null,
            data: response.data,
          }
        }
        return response.data;
      }
    )
  },
  get(url, data) {
    return axios({
      method: 'get',
      url: url,
      params: data
    })
    .then(
      (response) => {
        if (response.status && response.status != 200) {
          console.log("axios get failed")
          return {
            ExceptionCode: 0,
            Code: 100000,
            Message: '加载失败,请重试',
            ServerTime: null,
            data: response.data
          }
        }
        return response.data;
      }
    )
  }
}