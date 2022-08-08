<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  // 引入Swiper
  import Swiper from 'swiper'
  
  export default {
    name: "Carousel",
    props:['list'],
    watch:{
      list:{
        // 立即监听：不管数据有无变化，一上来立即监听一次
        // 为什么watch监听不到list，因为这个数据从来没有发生变化【父组件传过来的数据，该有的数据都有，数据没有发生变化】
        immediate:true,
        handler(){
          // 只能监听到数据有了，但是v-for动态渲染结构还是没有办法确定，因此还是需要用nextTick
          this.$nextTick(()=>{
            // 当你执行这个回调的时候，保证了服务器数据回来了，v-for执行完毕了【即轮播图的结构出来了】
            var mySwiper = new Swiper('.swiper-container', {
              loop: true, // 循环模式选项
              autoplay:true, //自动播放，默认时间3s

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                // 点击小圆点切换图片
                clickable:true
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            }) 
          })
        }
      }
    }
  };
</script>

<style lang="less" scoped>
</style>