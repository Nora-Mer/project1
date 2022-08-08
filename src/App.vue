<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在Login、Register隐藏 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
  import Header from './components/Header/index.vue';
  import Footer from './components/Footer/index.vue';

  export default {
    components: { Header,Footer },
    mounted(){
      //派发一个actions，获取商品分类的三级列表的数据 
      this.$store.dispatch("categoryList");
    }

  }
</script>

<style>

</style>
