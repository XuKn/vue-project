<template>
  <div class="order">
    <!-- 头部 -->
    <Header name= '订单列表' ></Header>
    <div class="order_contanier">
      <img src="./images/order/person.png">
      <p>登录后查看外卖订单</p>
      <div class="logins">立即登录</div>
    </div>
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
.order_contanier
  padding-top 140px
  width 60%
  margin 0 auto
  text-align center
  &>img 
    width 100%
    height 100%
  &>p
    padding 10px 0
    color #6a6a6a
    font-size 17px
  .logins
    width 100px
    height 40px
    line-height 40px
    font-size 13px
    margin 0 auto
    background-color $green
    color #fff
    border-radius 3px
</style>