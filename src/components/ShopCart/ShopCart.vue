<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleShow">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="totalNum?'highlight':''">
              <i class="iconfont iconShoppingcart" :class="totalNum?'highlight':''"></i>
            </div>
            <div v-if="totalNum !== 0" class="num">{{totalNum}}</div>
          </div>
          <div class="price" :class="totalNum?'highlight':''">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥4元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="20-totalPrice >=0 ? 'not-enough':'enough'">
            {{setTitle}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-if="isShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span @click="deleFood" class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul v-if="countFood.length">
              <li class="food" v-for="(food,index) in countFood" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="isShow = false" v-if="isShow"></div>
    </transition>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import CartControl from '../CartControl/CartControl'
import {mapState,mapGetters} from 'vuex'
import { REMOVE_COUNT_FOOD } from '../../vuex/mutations-type'
export default {
  components:{
    CartControl
  },
  methods: {
    //切换显示
    toggleShow(){
      if(this.totalNum || this.totalPrice){
        this.isShow = !this.isShow
      }else{
        return
      }
    },
    deleFood(){
      MessageBox.confirm('确定执行此操作?').then(action => {
        this.$store.commit(REMOVE_COUNT_FOOD)
      })
    },

  },
  watch:{
    totalNum(){
      if (this.totalNum === 0 || this.totalPrice===0) {
        this.isShow = false
      }
    }
  },
  computed:{
    setTitle(){
      if (this.totalNum || this.totalPrice) {
        if (20-this.totalPrice >= 0) {
          return `还差￥${20-this.totalPrice}元起送`
        }else{
          return '去结算'
        } 
      }else{
        return '￥20元起送'
      }
    },
    ...mapState({
      countFood : state => state.shop.countFood
    }),
    ...mapGetters(['totalNum','totalPrice'])
  },
  data() {
    return {
      isShow : false
    }
  },
}
</script>

<style lang="stylus"  scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .iconShoppingcart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active,&.move-leave-active
        transition transform 1s
      &.move-enter,&.move-leave-to
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        // max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
