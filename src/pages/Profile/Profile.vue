<template>
  <div class="profile">
    <!-- 头部 -->
    <Header name="我 的"></Header>
    <div class="my" @click="goLogin">
      <div class="my_header">
        <div class="my_icon">
          <i class="iconfont iconperson-fill"></i>
        </div>
        <div v-if="user.name" class="my_name" >{{user.name}}</div>
        <div v-else class="my_info">
          <div class="my_top">登录/注册</div>
          <div class="my_bottom">
            <i class="iconfont iconshouji"></i>
            <span>暂无绑定手机号</span>
          </div>
        </div>
        
        <div class="my_right">
          <span class="iconfont iconenter"></span>
        </div>
      </div>
    </div>
    <ul class="my_center">
      <li class="centerItem">
        <div class="count">
          <span class="c">0.00</span>
          <span>元</span>
        </div>
        <div class="item_text">我的余额</div>
      </li>
      <li class="centerItem">
        <div class="count">
          <span class="b">0</span>
          <span>个</span>
        </div>
        <div class="item_text">我的优惠</div>
      </li>
      <li class="centerItem">
        <div class="count">
          <span class="d">0</span>
          <span>分</span>
        </div>
        <div class="item_text">我的积分</div>
      </li>
    </ul>
    <ul class="my_footer">
      <li class="footerItem">
        <span class="iconfont icondingdan1"></span>
        <div class="item_right">
          <span class="footer_text">我的订单</span>
          <span class="iconfont iconenter"></span>
        </div>
        
      </li>
      <li class="footerItem">
        <span class="iconfont iconjifen"></span>
        <div class="item_right">
          <span class="footer_text">积分商城</span>
          <span class="iconfont iconenter"></span>
        </div>
        
      </li>
      <li class="footerItem">
        <span class="iconfont iconhuiyuan"></span>
        <div class="item_right">
          <span class="footer_text">硅谷外卖会员卡</span>
          <span class="iconfont iconenter"></span>
        </div>
      </li>
      <li class="footerItem">
        <span class="iconfont iconfuwuzhongxin"></span>
        <div class="item_right">
          <span class="footer_text">服务中心</span>
          <span class="iconfont iconenter"></span>
        </div>
      </li>
    </ul>
    <Button v-if= "user.name" type="danger" @click="tologin" size='large'>退出登录</Button>
  </div>
</template>

<script>
import {autoLogin} from '../../api/index'
import {mapState} from 'vuex'
import Header from '../../components/Header/Header.vue'
import { Button,MessageBox  } from 'mint-ui';
export default {
  components:{
    Header,
    Button
  },
  computed: {
    ...mapState({
      user : state => state.user.user
    })
  },
  methods: {
    //去登录
    goLogin(){
      this.$router.push('/login')
    },
    //退出登录
    tologin(){
      MessageBox.confirm('确定执行此操作?').then(
        (response) => {
          this.$store.commit('dele_user')
          localStorage.removeItem('token_key')
          this.$router.replace('/login')
        },
      )
      
    }
  },
  async mounted() { 
    //如果有token就自动登录
    if (!this.user.token && localStorage.getItem('token_key')) {
      let result = await autoLogin()
      result.data.token = localStorage.getItem('token_key')
      this.$store.commit('save_user',result.data)
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.my
  padding-top 45px
  .my_header
    top-border-1px(#fff)
    position relative
    background-color $green
    padding 20px 10px
    overflow hidden
  .my_icon
    float left
    width 60px
    height 60px
    border-radius 50%
    overflow hidden
    .iconperson-fill
      color #e4e4e4
      background-color #aaa
      font-size 62px
  .my_name
    color #fff
    float left
    padding 15px 0 0 15px
    font-size 22px
  .my_info
    float left
    padding 10px 0 0 20px
    color #fff
    .my_top
      font-size 18px
      font-weight 600
    .my_bottom
      margin-top 12px
      &>span 
        font-size 14px
  .my_right
    float right 
    margin-top 20px
    color #fff
.my_center
  display flex
  bottom-border-1px(#eee)
  .centerItem
    width 33%
    text-align center
    border-right 1px solid #f1f1f1
    padding-bottom 10px
    .count
      padding 20px 0 10px 0
      .c
        font-size 30px
        color orange
      .b
        font-size 30px
        color red
      .d 
        font-size 30px
        color green
    .item_text
      font-size 14px
      color #999
.my_footer
  margin-top 10px 
  top-border-1px(#ccc)
  .footerItem
    position relative
    .iconhuiyuan
      position absolute
      left 10px
      top 18px
      color yellow
    .iconjifen
      position absolute
      left 10px
      top 18px
      color red
    .iconfuwuzhongxin
      position absolute
      left 10px
      top 18px
      color $green
    .icondingdan1
      position absolute
      left 10px
      top 18px
      color green
    .item_right
      display flex
      justify-content space-between
      margin-left 30px
      padding-right 10px
      line-height 50px
      bottom-border-1px(#eee)
      .footer_text
        font-size 16px
        color #333
      .iconenter
        color #999
</style>