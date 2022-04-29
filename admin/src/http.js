import axios from 'axios'


const http = axios.create({  //创建一个axios实例
    baseURL: "http://localhost:3000/admin/api"
})

export default http