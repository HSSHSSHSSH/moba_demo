<template>
  <div class="login-container">

      <el-card  header="请登录" class="login-card">
          <el-form @submit.native.prevent="login">
              <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                  <el-input type="password" v-model="model.password"></el-input>
              </el-form-item>
              <el-form-item >
                  <el-button type="primary" native-type="sumbit">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
   data() {
       return {
           model: {
               username:'',
               password:''
           }
       }
   },
   methods: {
       async login() {
         let {data:res} = await this.$http.post('/login',this.model)
         console.log('rrrres',res);  
         localStorage.token = res
         this.$router.push('/')
         this.$message({
             message: '登陆成功',
             type:'success'
         })
       }
   }
}
</script>

<style>
  .login-card {
      width: 25rem;
      margin: 6rem auto;
  }
</style>