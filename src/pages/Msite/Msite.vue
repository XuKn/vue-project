<template>
  <div class="msite">
    <!-- 头部 -->
    <Header :name= "addressData">
      <span class="header_search" slot="top">
        <i class="iconfont iconsearch"></i>
      </span>
      <span class="header_login" slot="footer">登录|注册</span>
    </Header>
    <!-- 首页导航 -->
    <div class="nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(food,index) in foodCategory" :key= "index">
            <div class="navitem" v-for="(f,index) in food" :key="index">
              <div class="ImgBox">
                <img class="navImg" :src="'https://fuss10.elemecdn.com'+f.image_url">
              </div>
              <span class="navText">{{f.title}}</span>
            </div>
          </div>
        </div>
        <!-- 分页器自动生成标签 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 商家信息 --> 
    <div class="msite_shops"> 
      <!-- 商家头部区域 -->
      <div class="shops_header">
        <span class="shops_icon">
          <i class="iconfont iconPlaylist"></i>
        </span>
        <span class="shops_title">附近商家</span>
      </div>
      <!-- 商家内容区域 -->
      <ul class="shopsList">
        <li @click="goShop" class="shopItem" v-for="(shop,index) in shops" :key="index">
          <img class="shopImg" :src="'https://fuss10.elemecdn.com'+shop.image_path">
          <div class="shop">
            <div class="shop_header">
              <span class="shop_left">品牌</span>
              <span class="shop_title ellipsis">{{shop.name}}</span>
              <ul class="shop_infos">
                <li class="info">保</li>
                <li class="info">准</li>
                <li class="info">票</li>
              </ul>
            </div>
            <div class="shop_center">
              <Star :rating='shop.rating'/>
              <span class="grade">{{shop.rating}}</span>
              <span class="sale">月售{{shop.recent_order_num}}单</span>
              <div class="express">{{shop.delivery_mode.text}}</div>
            </div>
            <div class="shop_footer">
              <span>¥{{shop.float_minimum_order_amount}}起送</span>
              <span>/</span>
              <span>配送费约¥{{shop.float_delivery_fee}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
import Star from '../../components/Star/Star'
import {mapState} from 'vuex'
import Header from '../../components/Header/Header.vue'
export default {
  data() {
    return {
      isShowSwiper:true
    }
  },
  computed: {
    ...mapState(
      {
        addressData : state => state.msite.addressData,
        foodCategory : state => state.msite.foodCategory,
        shops : state => state.msite.shops
      })
  },
  components:{
    Header,
    Star
  },
  methods: {
    goShop(){
      this.$router.replace('/shop')
    }
  },
  watch:{
    foodCategory(){
        this.$nextTick(() => {
        new Swiper ('.swiper-container',{
          pagination:{
            el:'.swiper-pagination',
          }
        })
      })
    }
  },
  mounted() {
    //获取地址位置
    if (!this.$store.state.msite.addressData) {
      this.$store.dispatch('getAddressData')
    }
    //获取食物分类
    if (!this.$store.state.msite.foodCategory.length) {
      this.$store.dispatch('getFoodData')
    }else{
      new Swiper ('.swiper-container',{
        pagination:{
          el:'.swiper-pagination',
        }
      })
    }
    //获取商铺列表
    if (!this.$store.state.msite.shops.length) {
      this.$store.dispatch('getShopsData')
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.nav
  margin-top 45px
  height 200px
  width 100%
  bottom-border-1px(#eee)
  .swiper-container
    width 100%
    height 100%
    .swiper-wrapper
      .swiper-slide
        display flex
        flex-wrap wrap
        .navitem
          width 25%
          display flex
          flex-direction column
          align-items center
          .ImgBox
            width 100%
            text-align center
            padding-bottom 10px
            box-sizing border-box
            .navImg
              width 50px
              height 50px
        .navText
          color #666
  .swiper-pagination
    /deep/.swiper-pagination-bullet-active
      background-color $green
.msite_shops 
  margin-top 10px
  top-border-1px(#ccc) 
  .shops_header
    padding 10px 10px 0
    color #aaa
    .iconPlaylist
      font-size 14px 
    .shops_title
      font-size 14px
  .shopsList
    width 100%
    height 100%
    .shopItem
      display block
      padding 15px 8px
      box-sizing border-box
      bottom-border-1px(#eee)
      overflow hidden
      .shopImg
        float left
        width 23%
        height 75px
        padding-right 10px
        box-sizing border-box
      .shop
        width 77%
        height 75px
        float right 
        .shop_header
          .shop_left
            padding 0 2px
            background-color #ffd930
            border-radius 2px
            font-weight 700
            margin-right 5px
          .shop_title
            display inline-block
            max-width 140px
            font-size 16px
            font-weight bolder
          .shop_infos
            float right
            .info
              float left
              padding 0 2px
              border 1px solid #ddd
              color #bbb 
        .shop_center
          height 10px
          margin 20px 0 15px 0
          clearFix()
          .grade
            color red
            margin-left 2px
          .sale
            display inline-block
            transform-origin 0
            color rgba(0,0,0,.6)
            margin-left 5px
            transform scale(.7)
          .express
            float right
            color $green
            border 1px solid $green
            transform scale(.7)
        .shop_footer
          transform-origin 0
          transform scale(.9)
          color #999
</style>