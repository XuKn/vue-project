<template>
  <div>
    <!-- 缓存路由组件对象 使用时不需要再次加载 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <FooterGuide v-if="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  components:{
    FooterGuide
  }
}
</script>

<style lang="stylus">
</style>
