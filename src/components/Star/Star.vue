<template>
   <ul class="shop_stars">
      <li :class="star" v-for="(star,index) in stars" :key="index"></li>
   </ul>
</template>

<script>
export default {
  props:['rating'],
  computed: {
    stars(){
      //将数字转成字符串
      let Num = this.rating.toString()
      //分割成数组
      let numArr = Num.split('.')
      let arr = []
      for(let i = 0 ;i<numArr[0];i++){
        arr.push('on')
      }
      if (numArr[1] && numArr[1]>= 5) {
        arr.push('half') 
      }else{
        arr.push('off') 
      }
      return arr
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.shop_stars
  height 10px
  display inline-block
  .on
    width 10px
    float left
    margin-right 3px
    height 10px
    background-size cover
    bg-image('./images/stars/star24_on')
  .half
    width 10px
    float left
    margin-right 3px
    height 10px
    background-size cover
    bg-image('./images/stars/star24_half')
  .off
    width 10px
    float left
    margin-right 3px
    height 10px
    background-size cover
    bg-image('./images/stars/star24_off')
</style>