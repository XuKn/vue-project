  import {SAVE_ADDRESS,SAVE_FOOD,
          SAVE_SHOPS} from '../mutations-type.js'
  import {getAddress,getFoodCategory,getShops} from '../../api/index'
const state = {
  latitude:'40.10038',//纬度
  longitude:'116.36867',//经度
  geohash:'40.10038,116.36867',//经纬度
  addressData:'',//地理位置数据
  foodCategory :[],//食品分类
  shops:[],//商铺列表
}
const mutations = {
  [SAVE_ADDRESS](state,data){
    state.addressData = data
  },
  [SAVE_FOOD](state,data){
    state.foodCategory = data
  },
  [SAVE_SHOPS](state,data){
    state.shops = data
  },
}

const actions = {
   //获取地址位置数据
   async getAddressData({commit,state}){
    const {geohash} = state
    let result = await getAddress(geohash)
    commit(SAVE_ADDRESS,result.data.name)
  },
  //获取食品分类数据
  async getFoodData({commit}){
    let result = await getFoodCategory()
    let data = result.data
    let arr = []
    if (data&&data instanceof Array&&data.length>8) {
      arr.push(data.splice(0,8))
    }
    arr.push(data)
    commit(SAVE_FOOD,arr)
  },
  //获取商铺列表
  async getShopsData({commit,state}){
    const {latitude,longitude} = state
    let result = await getShops(latitude,longitude)
    commit(SAVE_SHOPS,result.data)
  },
}
const getters ={

}
export default {
  state,
  mutations,
  actions,
  getters
}