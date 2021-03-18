<template>
  <div class="footer">
    <ul class="footerList">
      <li class="footerItem" :class="$route.path==='/msite'?'on':''" @click="goto('/msite')">
        <span class="icon iconfont iconwaimai"></span>
        <span>{{$t('footer_home')}}</span>
      </li>
      <li class="footerItem" :class="$route.path==='/search'?'on':''" @click="goto('/search')">
        <span class="icon iconfont iconsousuo"></span>
        <span>{{$t('footer_search')}}</span>
      </li>
      <li class="footerItem" :class="$route.path==='/order'?'on':''" @click="goto('/order')">
        <span class="icon iconfont icondingdan"></span>
        <span>{{$t('footer_order')}}</span>
      </li>
      <li class="footerItem" :class="$route.path==='/profile'?'on':''" @click="goto('/profile')">
        <span class="icon iconfont iconweibiaoti2fuzhi12"></span>
        <span>{{$t('footer_own')}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    //防止重复跳转
    goto(path){
      if (this.$route.path !== path) {
        this.$router.replace(path)
      } 
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.footer
  position fixed
  display flex
  z-index 100
  background-color #fff
  width 100%
  left 0
  bottom 0
  height 50px
  .footerList
    border-top-1px(#aaa)
    width 100%
    display flex
    .footerItem
      width 25%
      display flex 
      flex-direction column
      align-items center
      .icon
        font-size 22px
      span
        font-size 12px
        margin-top 4px
    .on
      color $green
</style>