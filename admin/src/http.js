import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({  //创建一个axios实例
    baseURL: "http://localhost:3000/admin/api"
})


http.interceptors.request.use((config) => {
    if(localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || "")  //前端使用大写Authorization 后端使用小写authorization 会自动对应
    }
    return config
})


http.interceptors.response.use(res => {
    return res
},err => {
    Vue.prototype.$message({
        message: err.response.data.message,
        type: 'error'
    })
    
    console.log('err',err);
    if(err.response.status == 401) {
        console.log('跳转到登录页');
      router.push('/login')
    }

    return Promise.reject(err)
})

export default http