<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEnd.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>  
    <button v-if="startAndEnd.start>2">···</button>

    <!-- 中间部分 -->
    <template  v-for="(page,index) in startAndEnd.end" >
      <button :key="index" v-if="page>=startAndEnd.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
    </template>
    
    
    <button v-if="startAndEnd.end<totalPage-1">···</button>
    <button v-if="startAndEnd.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
<!--   25 26 27 28 29 30 31 -->
    <!-- <h3>{{startAndEnd}}----{{pageNo}}</h3> -->
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
      
      // 总共页数
      totalPage(){
        // 向上取整
        return Math.ceil(this.total/this.pageSize)
      },
      startAndEnd(){
        // 计算出连续页码的起始数据和结束数据
        let { totalPage,  pageNo , continues} = this;
        // 先定义两个变量存储其实数字和结束数字
        let start = 0
        let end = 0
        // 非正常情况，总页数【3】小于连续页数【5】
        if(continues > totalPage){
          start = 1
          end = totalPage
        }else{
          // 正常情况，总页数大于连续页数
          start = pageNo - parseInt(continues/2)
          end = pageNo + parseInt(continues/2)
          // 【不正常现象】起始页为负数|0
          if(start < 1){
            start = 1
            end = continues
          }
          // 【不正常现象】end数字大于总页码
          if(end > totalPage){
            start = totalPage - continues + 1
            end = totalPage
          }
        }
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #e43232;
        color: #fff;
      }
    }
  }
</style>