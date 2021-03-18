import ajax from './ajax.js'

//获取位置详情
export const getAddress =(geohash)=> ajax.get(`/position/${geohash}`)

//获取食品分类列表
export const getFoodCategory = () => ajax.get('/index_category')

//获取商铺列表
export const getShops = (latitude,longitude) => ajax.get(`/shops`,{params:{latitude,longitude}})

//发送验证码
export const getCode = (phone) => ajax.get('/sendcode',{params:{phone}})

//手机验证码登录
export const phoneLogin =(phone,code) => ajax.post('/login_sms',{phone,code})

//用户名密码登录
export const nameLogin = (name,pwd,captcha) => ajax.post('/login_pwd',{name,pwd,captcha})

//自动登录
export const autoLogin = () => ajax.get('/auto_login')

//获取食品信息
export const getGoods = () => ajax.get('/goods')

//获取评价信息
export const getRatings = () => ajax.get('ratings')

//获取商铺信息
export const getInfo = () => ajax.get('/info')