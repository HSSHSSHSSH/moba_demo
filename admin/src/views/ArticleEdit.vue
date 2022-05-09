<template>
  <div class="category">
      <h1>{{id? '编辑':'新建'}}文章</h1>
      <el-form label-width=120px @submit.native.prevent="save">
        <el-form-item label='上级分类'>
          <el-select v-model="model.categories" multiple>
            <el-option 
             v-for="item in categories"
             :key="item._id"
             :label="item.name"
             :value="item._id"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label='标题'>
          <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label='详情'>
          <vue-editor v-model="model.body" 
          useCustomImageHandler
          @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
          <el-button type='primary' native-type='submit'  >保存</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  props: {
    id:String
  },
  data() {
    return {
      model: {
        title: '',
        categories: [],
        body:''
      },
      categories:[]
    }
  },
  created() {
    this.fetchParents() 
    this.id && this.fetch()
  },
  methods: {
      async save() {
      let res
      if(this.id) {
        //编辑文章数据
        res = await this.$http.put(`/rest/articles/${this.id}`,this.model)
      } else {
        //创建文章数据
          res = await this.$http.post('/rest/articles',this.model)  
      }
        this.$router.push('/articles/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fetch() {
        let {data:res} = await this.$http.get(`/rest/articles/${this.id}`)
        this.model = res
      },
      async fetchParents() {
        let {data: res} = await this.$http.get('/rest/categories')
        this.categories = res
      },
     async  handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);
      let {data:res} = await this.$http.post('/upload',formData)
      Editor.insertEmbed(cursorLocation, "image", res.url);
      resetUploader();
    }
  }
}
</script>

<style>
  h1{
    margin: 30px;
  }
</style>