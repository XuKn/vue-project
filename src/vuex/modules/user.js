import {SAVE_USER,
  DELE_USER
} from '../mutations-type.js'
const state = {
  user:{},//用户信息
}
const mutations = {
  [SAVE_USER](state,data){
    state.user = data
  },
  [DELE_USER](state){
    state.user = {}
  }
}

const actions = {

}
const getters ={

}
export default {
  state,
  mutations,
  actions,
  getters
}