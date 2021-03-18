<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul ref="leftUl">
        <!-- current -->
        <li class="menu-item" @click="changeNanIndex(index)" :class="navIndex === index?'current':''" v-for="(good,index) in goods" :key="index">
          <span class="text bottom-border-1px">
            <img v-if="good.icon" class="icon" :src="good.icon">
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57"
                    :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food ="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart/>
  </div>
</template>

<script>
import ShopCart from '../../../components/ShopCart/ShopCart'
import CartControl from '../../../components/CartControl/CartControl'
import {mapState} from 'vuex'
import BetterScro1l from 'better-scroll'
export default {
  components:{
    CartControl,
    ShopCart
  },
  mounted() {
    //获取食品信息
    if (!this.goods.length) {
      let goods =JSON.parse(sessionStorage.getItem('goods')) 
      if (goods) {
        //异步执行解决上拉高度计算问题 解决初始化better-scroll问题
        setTimeout(() => {
          this.$store.commit('save_goods',goods)
        },);
        let countFood = []
        goods.forEach(good => {
          good.foods.forEach((food) => {
            if (food.count) {
              countFood.push(food)
            }
          })
        }); 
        this.$store.commit('save_count_food',countFood)
      }else{
        this.$store.dispatch('setGoods')
      }
    }else{
       this._initScroll()
       this._initTops()
    }
    window.addEventListener('unload',() => {
      sessionStorage.setItem('goods',JSON.stringify(this.goods))
    })
  },
  data() {
    return {
      tops:[],//li高度数组
      scrollY:'',//移动距离
    }
  },
  computed: {
    ...mapState({
      goods : state => state.shop.goods
    }),
    navIndex(){
      const {tops,scrollY} = this
      let index = tops.findIndex((top,index) => scrollY>=top&&scrollY<tops[index+1])
      if (this.leftScroll&&index !== this.index) {
        this.leftScroll.scrollToElement(this.$refs.leftUl.children[index],1000)
        this.index = index
      }
      return index
    }
  },
  methods: {
    _initScroll(){
      this.leftScroll = new BetterScro1l('.menu-wrapper',{
        click:true
      })
      this.rightScroll = new BetterScro1l('.foods-wrapper',{
        click:true,
        probeType: 2
      })
     this.rightScroll.on('scroll',({x,y}) => {
       this.scrollY = Math.abs(y)
     })
     this.rightScroll.on('scrollEnd',({x,y})=>{
       this.scrollY = Math.abs(y)
     })
    },
    _initTops(){
      let lis = Array.from(this.$refs.rightUl.children)
      let arr = []
      let top = 0
      arr.push(top)
      lis.reduce((pre,li) => {
        pre += li.clientHeight
        arr.push(pre)
        return pre
      },top)
      
     this.tops = arr
    },
    changeNanIndex(index){
      this.scrollY = this.tops[index]
      this.rightScroll.scrollTo(0,-this.scrollY,1000)
    }
  },
  watch: {
    goods(){
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

