<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
    <type-nav />
    <list-container />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor这个组件：自己在组件内部是没有发送网络请求的，数据是父组件给的 -->
    <!-- 父子组件顺序:⽗组件初始化 -> ⽗组件渲染完毕 -> ⼦组件初始化 -> ⼦组件挂载完毕 -> ⽗组件挂载完毕 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand />
    
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from "@/views/Home/ListContainer";
import Recommend from "@/views/Home/Recommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";

import {mapState} from 'vuex'


export default {
  name: "",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted(){
    // 派发action，获取floor组件的数据
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  },
};
</script>

<style lang="less" scoped>

</style>