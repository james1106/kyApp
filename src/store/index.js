import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const state = {
  isShowTabbar: true,             // 是否展示tabber
  version: '0.0.4',               // 当前版本号
  messageCount: localStorage.getItem('messageCount'),             // 消息次数
  appid: '',                      // 用户id
  value: '',                      // 秘钥
  token: '',                      // 用户token
  selected: '管钱',               // tabbar选中id


  store: '',                      // 对账页面 -> 门店
  payment: '',                    // 对账页面 -> 支付方式
  status: '',                     // 对账页面 -> 支付状态
  beginTime: '',                  // 对账页面 -> 开始时间
  endTime: '',                    // 对账页面 -> 结束时间
};

const actions = {
  changeTabbarShow({commit,state}, value){
    commit('changeTabbarShow');
  },
  messageCountChange({commit}, value ){
    commit('messageCountChange',value);
  },
  appidGet({commit}, value){
    commit('appidGet',value);
  },
  valueGet({commit}, value){
    commit('valueGet',value);
  },
  tokenGet({commit}, value){
    commit('tokenGet',value);
  },
};

const getters = {
  isShowTabbar(state){
    return state.isShowTabbar;
  },
  version(state){
    return state.version;
  },
  messageCount(state){
    return state.messageCount;
  },
  getAppid(state){
    return state.appid;
  },
  getsValue(state){
    return state.value;
  },
  getToken(state){
    return state.token
  }
};

const mutations = {
  changeTabbarShow(state, value){
    state.isShowTabbar = value;
  },
  messageCountChange(state){
    state.messageCount = localStorage.getItem('messageCount');
  },
  appidGet(state,value){
    state.appid = value;
  },
  valueGet(state,value){
    state.value = value;
  },
  tokenGet(state, value){
    state.token = value;
  },
  storeSave(state,value){
    state.store = value;
  },
  paymentSave(state,value){
    state.payment = value;
  },
  statusSave(state,value){
    state.status = value;
  },
  beginTimeSave(state,value){
    state.beginTime = value;
  },
  endTimeSave(state,value){
    state.endTime = value;
  },
};


export default new vuex.Store({
  state,
  actions,
  getters,
  mutations
})
