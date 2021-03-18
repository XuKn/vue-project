import Vue from 'vue'
import App from './App.vue'
import './validate' //vue表单验证
import router from '@/router/index.js'
import store from './vuex/store'
import 'lib-flexible' //移动端适配rem
import './mock/mockServer.js' //mock虚拟数据
import i18n from './i18n'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
