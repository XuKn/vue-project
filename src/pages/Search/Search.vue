<template>
  <div class="search">
    <!-- 头部 -->
    <Header name="搜索"></Header>
    <!-- 内容 -->
    <form class="search_from">
      <input type="text" class="text" placeholder="请输入商家或美食名称">
      <input type="submit" class="submit" value="提交">
    </form>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
 components:{
   Header
 }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.search_from
  position relative
  top 45px
  padding 12px 8px
  .text
    padding 4px
    height 34px
    box-sizing border-box
    width 79%
    background-color #f2f2f2
    color #333
    font-size 14px
    font-weight 600
    outline none
    border-radius 2px
  .submit
    float right 
    height 34px
    width 18%
    color #fff
    font-size 16px
    font-weight 600
    outline none
    background-color $green
    border-radius 2px
</style>