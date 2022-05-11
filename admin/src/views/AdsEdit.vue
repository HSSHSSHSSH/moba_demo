<template>
  <div class="category">
      <h1>{{id? '编辑':'新建'}}广告位</h1>
      <el-form label-width=120px @submit.native.prevent="save">
      <el-form-item label='名称'>
          <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
          <el-button type="text" @click="model.items.push({})">
              <i class="el-icon-plus"></i>添加广告
            </el-button>
            <el-row  type="flex" style="flex-wrap:wrap">
              <el-col :md=24 v-for="(item,key) in model.items" :key="key">
                <el-form-item class="ads_item"  label="跳转连接">
                  <el-input v-model="item.url"></el-input>
                </el-form-item>
                <el-form-item class="ads_item" label="图片">
                  <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image',res.url)">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="model.items.splice(key,1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
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
        name: '',
        items:[]
      },
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
        res = await this.$http.put(`/rest/ads/${this.id}`,this.model)
      } else {
        //创建分类数据
          res = await this.$http.post('/rest/ads',this.model)  
      }
        this.$router.push('/ads/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fetch() {
        let {data:res} = await this.$http.get(`/rest/ads/${this.id}`)
        this.model = Object.assign({},this.model,res)
      },
  }
}
</script>

<style>
  h1{
    margin: 30px;
  }
  .ads_item{
      margin-top: 0.6rem;
  }
</style>