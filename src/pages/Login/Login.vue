<template>
  <div class="login">
    <div class="login_header">
      <h2 class="login_logo">硅谷外卖</h2>
    </div>
    <ul class="login_nav">
      <li class="login_title" :class="isShow ?'on':''" @click="isShow=true">短信登录</li>
      <li class="login_title" :class="isShow ?'':'on'" @click="isShow=false">密码登录</li>
    </ul>
    <div class="login_content">
      <form action="xxx">
        <div :class="isShow?'':'on'">
          <div class="login_name">
            <input class="inp" type="text" maxlength="11"  v-validate="'required|mobile'" name="phone" v-model="phone"  placeholder="手机号">
            <span v-show="errors.has('phone')" class='isDanger'>{{ errors.first('phone') }}</span>
            <button class="set_code" @click.prevent="sendCode" ref="setCode"  :disabled="!showCode" >{{isShowCode?'发送验证码':`${time}s后可重新获取`}}</button>
          </div>
          <div class="login_code">
            <input class="inp" type="text"  v-validate="'required'" name="code" v-model="code" maxlength="8"  placeholder="验证码">
            <span v-show="errors.has('code')" class='isDanger'>{{ errors.first('code') }}</span>
          </div>
          <div class="login_text">
            温馨提示: 未注册硅谷外卖账号的手机号, 登录时将自动注册, 且代表已同意
            <span class="text">《用户服务协议》</span>
          </div>
        </div>
        <div :class="isShow?'on':''">
          <div class="login_name">
            <input class="inp" maxlength="12"  v-model="name"  v-validate="'required'"  name="name"  type="text" placeholder="用户名">
            <span v-show="errors.has('name')" class='isDanger'>{{ errors.first('name') }}</span>
          </div>
          <div class="login_code">
            <input class="inp" :type="passShow?'test':'password'"
             autocomplete v-model="pwd"  
             placeholder="密码" maxlength="12"  v-validate="'required'" name="pwd" >
            <span v-show="errors.has('pwd')" class='isDanger'>{{ errors.first('pwd') }}</span>
            <div class="showOrNo"  @click="showOrNo" :class="passShow?'on':'off'">
              <span  class="show_text">abc</span>
              <div class="circle"></div>
            </div>
          </div>
          <div class="login_code">
            <input class="inp" type="text" maxlength="4" v-model="captcha" v-validate="'required'"  name="captcha"  placeholder="验证码">
            <span v-show="errors.has('captcha')" class='isDanger'>{{ errors.first('captcha') }}</span>
            <img class="codeImg" @click="ToggleUrl" :src= "codeUrl" alt="captcha">
          </div>
        </div>
        <button class="login_submit" @click.prevent="login" type="submit">{{$t('login_login')}}</button>
      </form>
      <p class="about_us">{{$t('login_aboutUs')}}</p>
    </div>
    <div class="lang">
      <button @click="toggleLan('zh_CN')" class="Chinese lan">中文</button>
      <button @click="toggleLan('ja')" class="Japanese lan">日文</button>
      <button @click="toggleLan('en')" class="English lan">英文</button>
    </div>
    <i @click="goback" class="iconfont iconfanhui"></i>
  </div>
</template>

<script>
import {Toast } from 'mint-ui'
import {getCode,phoneLogin,nameLogin} from '../../api/index'
export default {
  data() {
    return {
      isShow:false,
      phone:'',//手机号
      code:'',//手机验证码同步
      codeUrl:'http://localhost:4000/captcha',//验证码图片
      passShow:false,//密码的显示隐藏
      pwd:'',//密码同步
      name:'',//用户名
      captcha:'',//图片验证码
      isShowCode : true,
      time:5,//时间
    }
  },
  mounted() {
    this.$i18n.locale = localStorage.getItem('local_key')
  },
  methods: {
    //改变验证码图片
    ToggleUrl(){
      this.codeUrl = `http://localhost:4000/captcha?time=${Date.now()}`
    },
    //发送验证码
    async sendCode(){
      this.isShowCode = false
      let timeInter = setInterval(() => {
        this.time--
        if (this.time<=0) {
          clearInterval(timeInter)
          this.isShowCode = true
        }
      }, 1000);
      let result = await getCode(this.phone)
      if (result.code === 0) {
        Toast ('验证码发送成功')
      }else{
        Toast ('验证码发送失败')
      }
      console.log(result);
    },
    //显示隐藏密码
    showOrNo(){
      this.passShow = !this.passShow
    },
    //登录
    async login(){
      const {phone,code,name,pwd,captcha} =this
      let names = this.isShow?['phone','code']:['name','pwd','captcha']
      const success = await this.$validator.validateAll(names)
      if (success) {
        //前端验证成功
        //进行后端验证
        let result
        if (this.isShow) {
          result = await phoneLogin(phone,code)
        }else{
          result = await nameLogin(name,pwd,captcha) 
        }
        if (result.code === 0) {
          this.$store.commit('save_user',result.data)
          localStorage.setItem('token_key',result.data.token)
          this.$router.replace('/profile')
          Toast('登录成功')
        }else{
          this.ToggleUrl()
          Toast(result.msg)
        }
      }else{
        this.ToggleUrl()
        Toast ('验证失败')
      }
    },
    goback(){
      window.history.back()
    },
    //切换语言
    toggleLan(lang){
      switch (lang) {
        case 'zh_CN': 
        this.$i18n.locale = 'zh_CN'
        localStorage.setItem('local_key','zh_CN')
          break;
        case 'ja': 
        this.$i18n.locale = 'ja'
        localStorage.setItem('local_key','ja')
          break;
        case 'en': 
        this.$i18n.locale = 'en'
        localStorage.setItem('local_key','en')
          break;
        default:
          break;
      }
    }
  },
  //  const success = await this.$validator.validateAll() // 对所有表单项进行验证
//  const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
  computed: {
    //显示发送验证码
    showCode(){
       return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.isDanger
  position absolute
  left 0
  bottom 0
  transform translateY(100%)
  color red
  font-size 15px
.login
  padding-top 60px
  width 80%
  margin 0 auto 
  .login_header
     text-align center
     .login_logo
       font-size 40px
       color $green
       font-weight bold
  .login_nav
    margin-top 40px
    display flex
    justify-content center
    .login_title
      font-size 14px
      margin 0 20px
      padding-bottom 7px
    .on
      font-weight bold
      color $green
      border-bottom 2px solid $green
  .login_content
    .on
      display none
    .login_name
      margin 8px 0
      position relative
      .set_code
        position absolute  
        right 1px
        top 26%
        font-size 14px
        border none 
        outline none
        background-color transparent
    .login_code
      position relative
      margin 15px 0 10px 0
      .off 
        .circle
          position absolute
          top -0.5px
          left 0
        .show_text
          display none
      .on
        display block
        background-color $green
        .circle
          position absolute
          top -0.5px
          right -1px
          background-color #fff
        .show_text 
          display block
          position absolute
          top 50%
          left 5px
          transform translateY(-50%)
          color #fff
      .codeImg
        position absolute
        right 10px
        top 50%
        transform translateY(-50%)
        color #ccc
        font-size 14px
      .showOrNo
        position absolute
        right 10px
        top 50%
        width 42px
        height 16px
        border 1px solid #ccc
        border-radius 10px
        transform translateY(-50%)
        .circle
          width 15px
          height 15px
          border-radius 50%
          box-shadow: 0 0.053333rem 0.106667rem 0 #ccc
          border 1px solid #ddd
    .inp
      width 100%
      border-radius 3px
      border 1px solid #ddd
      padding 15px 0 15px 10px
      box-sizing border-box
      outline none
      font-size 14px
    .inp:focus
      border 1px solid $green
    .login_text
      font-size 14px
      line-height 20px
      color #999  
      .text 
        color $green 
    .login_submit
      border none
      width 100%
      height 42px
      margin-top 30px
      border-radius 3px
      font-size 16px
      background-color #4cd96f
      color #fff
      outline none
    .about_us
      text-align center
      margin-top 20px
      color #999
  .lang
    width 100%
    display flex
    .Chinese
      background-color #4cd96f
    .Japanese
      background-color yellow
    .English
      background-color red
    .lan
      flex 1
      height 40px
      margin 20px
      color #fff
      border-radius 5px
      outline none 
      border none
      font-size 14px 
.iconfanhui
  position absolute
  color #999
  font-size 16px
  top 10px
  left 8px
</style>
