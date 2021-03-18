<template>
  <header class="header">
    <slot name="top"></slot>
    <slot>
      <span class="header_title ellipsis">{{name}}</span>
    </slot>
    <slot name="footer"></slot>
  </header>
</template>

<script>
export default {
props:['name']
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl';
.header 
  position fixed
  z-index 100
  top 0
  left 0
  height 45px
  line-height 45px
  width 100%
  background-color $green
  color #fff
  box-sizing border-box
  .iconsearch
    position absolute
    left 15px
    font-size 24px
  .header_title
    position absolute
    max-width 180px
    left 50%
    transform  translateX(-50%)
    font-size 20px
  .header_login
    position absolute
    right 0
    margin-right 15px
    font-size 14px
</style>

