import {getGoods,getInfo,getRatings} from '../../api/index'
import {SAVE_GOODS,SAVE_RATINGS,
  SAVE_INFO,SAVE_COUNT,DELE_COUNT,
  ADD_COUNT,DELE_COUNT_FOOD,REMOVE_COUNT_FOOD,SAVE_COUNT_FOOD} from '../mutations-type.js'
import Vue from 'vue'
const state = {
  goods:[],//食品信息
  ratings:[],//评价信息
  info:{},//商铺信息
  countFood:[]
}
const mutations = {
  [SAVE_GOODS](state,data){
    state.goods = data
  },
  [SAVE_RATINGS](state,data){
    state.ratings = data
  },
  [SAVE_INFO](state,data){
    state.info = data
  },
  [SAVE_COUNT](state,{data,count}){
     Vue.set(data,'count',count)
     state.countFood.unshift(data)
  },
  [ADD_COUNT](state,data){
     Vue.set(data,'count',data.count)
  },
  [DELE_COUNT](state,data){
    Vue.set(data,'count',data.count)
  },
  [DELE_COUNT_FOOD](state,data){
    state.countFood.splice(data,1)
  },
  [REMOVE_COUNT_FOOD](state){
    state.countFood.forEach(item => {
      item.count = 0
    });
    state.countFood = []
  },
  [SAVE_COUNT_FOOD](state,data){
    state.countFood = data
  }
}

const actions = {
  async setGoods({commit}){
    let result = await getGoods()
    commit(SAVE_GOODS,result.data)
  },
  async setRatings({commit}){
    let result = await getRatings()
    commit(SAVE_RATINGS,result.data)
  },
  async setInfo({commit}){
    let result = await getInfo()
    commit(SAVE_INFO,result.data)
  },
  addCount({commit},data){
    if (!data.count) {
      let count = 0 
      count++
      commit(SAVE_COUNT,{data,count})
    }else{
      data.count++
      commit(ADD_COUNT,data)
    }
  } ,
  deleCount({commit,state},data){
    if (data.count &&data.count>0) {
      data.count--
      commit(DELE_COUNT,data)
    }
    if (data.count <= 0) {
      let index = state.countFood.findIndex(food=>food===data)
      commit(DELE_COUNT_FOOD,index)
    }
  }
}
const getters ={
  //总数量
  totalNum(state){
    let num = state.countFood.reduce((pre,food)=>{
      pre = pre + food.count
      return pre
    },0)
    return num
  },
  //总价格
  totalPrice(state){
    let prices = state.countFood.reduce((pre,food) => {
      pre = pre + food.count * food.price
      return pre
    },0)
    return prices
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}