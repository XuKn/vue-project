import Vue from 'vue'
import Vuex from 'vuex'

import shop from './modules/shop'
import user from './modules/user'
import msite from './modules/msite'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    shop,
    msite,
    user
  }
})