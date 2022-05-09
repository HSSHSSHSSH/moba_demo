<template>
  <div class="category">
      <h1>{{id? '编辑':'新建'}}英雄</h1>
      <el-form label-width=120px @submit.native.prevent="save">
        <el-tabs value="skills" type="border-card" style="margin-left:30px">
          <el-tab-pane label="基本信息">
            <el-form-item label='名称'>
          <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label='称号'>
              <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label='头像'>
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="afterUpload">
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
          </el-form-item>
          <el-form-item label='类型'>
              <el-select v-model="model.categories" multiple>
                <el-option 
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
                ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label='难度'>
              <el-rate show-score :max="9" style="margin-top:0.6rem" v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label='技能'>
              <el-rate show-score :max="9" style="margin-top:0.6rem" v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label='攻击'>
              <el-rate show-score :max="9" style="margin-top:0.6rem" v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label='生存'>
              <el-rate show-score :max="9" style="margin-top:0.6rem" v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label='顺风出装'>
              <el-select v-model="model.items1" multiple>
                <el-option 
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
                ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label='逆风出装'>
              <el-select v-model="model.items2" multiple>
                <el-option 
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
                ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
              <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对线技巧">
              <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
              <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="技能信息" name="skills"> 
            <el-button type="text" @click="model.skills.push({name:'',icon:'',description:'',tips:''})">
              <i class="el-icon-plus"></i>添加技能
            </el-button>
            <el-row type="flex" style="flex-wrap:wrap">
              <el-col :md=12 v-for="(item,key) in model.skills" :key="key">
                <el-form-item  label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item  label="图标">
                  <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item v-model="item.description" label="描述">
                  <el-input v-model="item.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item  label="提示">
                  <el-input v-model="item.tips" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="model.skills.splice(key,1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      <el-form-item style="margin-top:1rem">
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
      categories:[],
      items:[],
      model: {
        name: '',
        avatar:'',
        title:'',
        categories: [],
        scores: {
            difficult: 0,
            skills:0,
            attack:0,
            survive:0
        },
        items1:[],
        items2:[],
        usageTips:'',
        battleTips:'',
        teamTips:'',
        skills:[]
      },
    }
  },
  created() {
    this.fetchParents()
    this.fetchItems() 
    this.id && this.fetch()
  },
  methods: {
      afterUpload(res){
        this.model.avatar = res.url
      },
      async save() {
      let res
      if(this.id) {
        //编辑分类数据
        res = await this.$http.put(`/rest/heros/${this.id}`,this.model)
      } else {
        //创建分类数据
          res = await this.$http.post('/rest/heros',this.model)  
      }
        this.$router.push('/heros/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fetch() {
        let {data:res} = await this.$http.get(`/rest/heros/${this.id}`)
        this.model = Object.assign({},this.model,res)
      },
      async fetchParents() {
        let {data: res} = await this.$http.get('/rest/categories')
        this.categories = res
      },
      async fetchItems() {
        let {data: res} = await this.$http.get('/rest/items')
        this.items = res
      }
  }
}
</script>

<style>

</style>