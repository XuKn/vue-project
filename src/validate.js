import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    name: '用户名',
    pwd:'密码',
    code: '验证码',
    phone:'手机号',
    captcha:'手机验证码'
  }
})
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
