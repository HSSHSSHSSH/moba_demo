<template>
  <div>
      <div class="topbar bg-black py-2 px-2 d-flex ai-center">
       <img src="./../assets/images/logo.png" height="40">
       <div class="px-3 d-flex flex-1  flex-column ">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
       </div>
       <button type="button" class="btn bg-primary">立即下载</button>
    </div>

    <div class="py-2 bg-primary">
        <div class="nav d-flex jc-around text-white">
            <div class="nav-item active">
                <router-link tag="div" to="/"  class="nav-link">首页</router-link>
            </div>

            <div class="nav-item">
                <router-link  tag="div" to="/"  class="nav-link">攻略中心</router-link>
            </div>

            <div class="nav-item">
                <router-link  tag="div" to="/"  class="nav-link">赛事中心</router-link>
            </div>

        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>