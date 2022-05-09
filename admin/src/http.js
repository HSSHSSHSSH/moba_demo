import axios from 'axios'
import Vue from 'vue'

const http = axios.create({  //创建一个axios实例
    baseURL: "http://localhost:3000/admin/api"
})

http.interceptors.response.use(res => {
    return res
},err => {
    Vue.prototype.$message({
        message: err.response.data.message,
        type: 'error'
    })
    return Promise.reject(err)
})

export default http