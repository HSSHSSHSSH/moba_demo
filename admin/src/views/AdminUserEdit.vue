<template>
  <div class="category">
      <h1>{{id? '编辑':'新建'}}分类</h1>
      <el-form label-width=120px @submit.native.prevent="save">
      <el-form-item label='用户名'>
          <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label='密码'>
          <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type='primary' native-type='submit'  >保存</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id:String
  },
  data() {
    return {
      model: {
        name: ''
      },
      parents:[]
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
      async save() {
      let res
      if(this.id) {
        //编辑分类数据
        res = await this.$http.put(`/rest/admin_users/${this.id}`,this.model)
      } else {
        //创建分类数据
          res = await this.$http.post('/rest/admin_users',this.model)  
      }
        this.$router.push('/admin_users/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fetch() {
        let {data:res} = await this.$http.get(`/rest/admin_users/${this.id}`)
        this.model = res
      },
  }
}
</script>

<style>
  h1{
    margin: 30px;
  }
</style>