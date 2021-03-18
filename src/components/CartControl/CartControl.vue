<template>
  <div class="cartcontrol">
    <transition name="move">
      <div @click="deleCount" v-if="food.count" class="iconfont iconremove-circle-outline"></div>
    </transition>
    <div v-if="food.count" class="cart-count">{{food.count}}</div>
    <div @click="addCount" class="iconfont iconadd-circle"></div>
  </div>
</template>

<script>
export default {
  props:['food'],
  data() {
    return {
      isNow : true
    }
  },
  methods: {
    deleCount(){
      // if (this.isNow) {
      //     this.isNow = false
      //   setTimeout(() => {
          this.$store.dispatch('deleCount',this.food)
      //     this.isNow = true
      //   }, 300);
      // }
    },
    addCount(){
      // if (this.isNow) {
      //     this.isNow = false
      //   setTimeout(() => {
          this.$store.dispatch('addCount',this.food)
      //     this.isNow = true
      //   }, 300);
      // }
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .iconremove-circle-outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active,&.move-leave-active
        transition 1s
      &.move-enter,&.move-leave-to
        opacity: 0;
        transform: translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .iconadd-circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>

